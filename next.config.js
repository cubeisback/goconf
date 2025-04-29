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
  