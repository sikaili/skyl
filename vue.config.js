process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
  productionSourceMap: false,
  lintOnSave: false,
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './src/sw.js',
      swDest: 'service-worker.js',
      exclude: [
        /manifest\.json$/,
      ],
      maximumFileSizeToCacheInBytes: 1000000,
    },
    themeColor: '#1d1d1e',
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(|wav|m4a)(\?.*)?$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        },
      ],
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "src/scss/config/index.scss";',
      },
      scss: {
        prependData: '@import "src/scss/config/index.scss";',
      },
    },
  },
};
