#!/usr/bin/env bash
set -Eeuo pipefail
umask 022

target=${1:?Target required}
release_id=${2:?Release ID required}
case "$target" in
  dev) domain=dev.goconf.ru; port=3001; check_port=3101; version=dev ;;
  prod) domain=goconf.ru; port=3000; check_port=3100; version=production ;;
  *) echo 'Unknown deployment target' >&2; exit 1 ;;
esac
[[ "$release_id" =~ ^[a-f0-9]{40}-[0-9]+-[0-9]+$ ]]
[[ "$(id -un)" = thunder ]]
base="/home/thunder/web/$domain"
release="$base/releases/$release_id"
[[ "$(realpath "$(dirname "$0")/..")" = "$release" ]]
export PM2_HOME=/home/thunder/.pm2
export NODE_ENV=production
export ENV_FILE=.env.production
export NEXT_PUBLIC_VERSION="$version"
export PORT="$port"
name="goconf-$target"

exec 9>"$base/.frontend-deploy.lock"
flock -w 1200 9
cd "$release"
test -s .env.production
grep -qx "NEXT_PUBLIC_VERSION=$version" .env.production
grep -qx "NEXT_PUBLIC_GOOGLE_REDIRECT_URI=https://$domain/social-login/google" .env.production
grep -qx "NEXT_PUBLIC_YANDEX_REDIRECT_URI=https://$domain/social-login/yandex" .env.production
test ! -e .env.local
test ! -e .env.production.local
test ! -e public/robots.txt
NODE_OPTIONS=--max-old-space-size=3072 npm ci --legacy-peer-deps --no-audit --no-fund
NODE_OPTIONS=--max-old-space-size=3072 npm run build

candidate_pid=''
switched=0
committed=0
previous=$(readlink -f "$base/app")
legacy="$base/app-before-$release_id"
start_app() {
  local directory=$1
  pm2 start "$directory/node_modules/next/dist/bin/next" --name "$name" --cwd "$directory" -- start -H 127.0.0.1 -p "$port"
}
stop_candidate() {
  if [[ -n "$candidate_pid" ]]; then
    kill "$candidate_pid" 2>/dev/null || true
    wait "$candidate_pid" 2>/dev/null || true
    candidate_pid=''
  fi
}
cleanup() {
  local result=$?
  trap - EXIT
  stop_candidate
  if [[ "$switched" = 1 && "$committed" = 0 ]]; then
    echo 'Activation failed; restoring previous frontend' >&2
    pm2 delete "$name" >/dev/null 2>&1 || true
    ln -sfnT "$previous" "$base/app"
    if [[ "$had_process" = 1 ]]; then
      start_app "$previous" || true
    fi
    pm2 save --force || true
  fi
  exit "$result"
}
trap cleanup EXIT

PORT="$check_port" node node_modules/next/dist/bin/next start -H 127.0.0.1 -p "$check_port" > candidate.log 2>&1 &
candidate_pid=$!
ready=0
for attempt in $(seq 1 30); do
  kill -0 "$candidate_pid"
  if curl -fsS --max-time 5 -H "Host: $domain" "http://127.0.0.1:$check_port/robots.txt" > /dev/null; then
    ready=1; break
  fi
  sleep 2
done
[[ "$ready" = 1 ]]
node scripts/check-frontend.mjs "http://127.0.0.1:$check_port" "$domain" "$target"
stop_candidate

had_process=0
if pm2 describe "$name" > /dev/null 2>&1; then had_process=1; fi
# Preserve the original directory on the first deployment; later app is a symlink.
if [[ ! -L "$base/app" ]]; then
  mv "$base/app" "$legacy"
  previous="$legacy"
fi
switched=1
ln -sfnT "$release" "$base/app"
if [[ "$had_process" = 1 ]]; then pm2 delete "$name"; fi
start_app "$release"
ready=0
for attempt in $(seq 1 30); do
  if curl -fsS --max-time 5 -H "Host: $domain" "http://127.0.0.1:$port/robots.txt" > /dev/null; then
    ready=1; break
  fi
  sleep 2
done
[[ "$ready" = 1 ]]
node scripts/check-frontend.mjs "http://127.0.0.1:$port" "$domain" "$target"
node scripts/check-frontend.mjs "https://$domain" "$domain" "$target"
pm2 save --force
committed=1
printf 'Deployed %s: %s, port %s\n' "$domain" "$release_id" "$port"
