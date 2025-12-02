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

images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'goconf.ru',
        port: '',
        pathname: '/backend/wp-content/uploads/**',
      },
    ],
  },

   async rewrites() {
    return [
      {
        source: '/sitemap-events-:page.xml',
        destination: '/sitemap-events/:page',
      },
      {
        source: '/sitemap-filters-:direction.xml',
        destination: '/sitemap-filters/:direction',
      },
    ];
  },
};

module.exports = nextConfig;