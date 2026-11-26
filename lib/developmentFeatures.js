function hostname(value = '') {
  return String(value).split(',')[0].trim().toLowerCase().replace(/:\d+$/, '');
}

// An explicit allowlist: unknown hosts and any production host fail closed.
export function allowsDevelopmentFeatures(...hosts) {
  const names = hosts.filter(Boolean).map(hostname);
  if (names.some(name => name === 'goconf.ru' || name === 'www.goconf.ru')) return false;
  return names.length > 0 && names.every(name =>
    ['dev.goconf.ru', 'localhost', '127.0.0.1', '[::1]'].includes(name),
  );
}
