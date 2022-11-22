const { i18n } = require('./next-i18next.config');

const nextConfig = {
  i18n,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/protection',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
