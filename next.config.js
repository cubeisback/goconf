const fs = require('fs');
const dotenv = require('dotenv');

// Подключаем кастомный env-файл
// ENV_FILE будет передаваться в workflow через export или npm run build
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

  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: 'https://dev.goconf.ru/backend/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
