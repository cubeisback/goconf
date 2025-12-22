export function getBaseUrl() {
  const version = process.env.NEXT_PUBLIC_VERSION;
  
  switch(version) {
    case 'local':
      return 'http://localhost:3000';
    
    case 'dev':
      return 'https://dev.goconf.ru';
    
    case 'production':
      return 'https://goconf.ru';
    
    default:
      return 'http://localhost:3000';
  }
}