const fs = require('fs');
const dotenv = require('dotenv');

const envFile = process.env.ENV_FILE || '.env.production';

if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
  console.log(`Loaded environment variables from ${envFile}`);
} else {
  console.warn(`Env file ${envFile} not found, using defaults`);
}

const nextConfig = {
  reactStrictMode: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  // Используем rewrites только в development
  async rewrites() {
    // В production не используем rewrites, т.к. nginx уже проксирует
    if (process.env.NODE_ENV === 'production') {
      return [];
    }
    
    // В development используем rewrites для доступа к API
    return [
      {
        source: '/backend/:path*',
        destination: 'https://goconf.ru/backend/:path*',
      },
    ];
  },
};

module.exports = nextConfig;