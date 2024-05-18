module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/auth/:path*',
        destination: 'http://localhost:3020/auth/:path*', // Proxy to Backend
      },
    ];
  },
};
