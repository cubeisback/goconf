import assert from 'node:assert/strict';

const [base, domain, target] = process.argv.slice(2);
assert.ok(base && domain && ['dev', 'prod'].includes(target));
const headers = { Host: domain, 'X-Forwarded-Host': domain };
const request = async (path) => {
  const response = await fetch(`${base}${path}`, {
    headers, redirect: 'manual', signal: AbortSignal.timeout(30000),
  });
  assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
  return { response, body: await response.text() };
};
const { response, body } = await request('/');
const robots = await request('/robots.txt');
const dev = target === 'dev';
assert.equal(response.headers.get('x-goconf-host'), domain);
assert.equal(response.headers.get('x-goconf-index'), dev ? 'deny' : 'allow');
assert.equal(response.headers.get('x-goconf-version'), dev ? 'dev' : 'production');
const robotTags = [...body.matchAll(/<meta\b[^>]*name="(?:robots|googlebot|yandex)"[^>]*>/gi)].map(match => match[0]);
if (dev) {
  assert.match(response.headers.get('x-robots-tag') || '', /noindex/i);
  assert.ok(robotTags.some(tag => /noindex/.test(tag)), 'Missing HTML noindex');
  assert.match(robots.body, /^Disallow:\s*\/\s*$/m);
  assert.equal(robots.response.headers.get('x-goconf-robots-mode'), 'disallow-all');
} else {
  assert.doesNotMatch(response.headers.get('x-robots-tag') || '', /noindex/i);
  assert.ok(robotTags.some(tag => /content="index,/.test(tag)), 'Missing HTML index');
  assert.ok(robotTags.every(tag => !/noindex|content="none"/i.test(tag)), 'Production HTML forbids indexing');
  assert.doesNotMatch(robots.body, /^Disallow:\s*\/\s*$/m);
  assert.equal(robots.response.headers.get('x-goconf-robots-mode'), 'allow-prod');
}
console.log(`Verified ${domain}: HTTP 200, ${dev ? 'noindex' : 'index'}, robots.txt`);
