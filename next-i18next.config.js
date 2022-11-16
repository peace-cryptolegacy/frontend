module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  react: {
    useSuspense: false
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false
    }
    return config
  }
};
