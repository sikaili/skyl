process.env.VUE_APP_VERSION = require('./package.json').version;
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

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
      // maximumFileSizeToCacheInBytes: 2000000,
    },
    themeColor: '#1d1d1e',
  },
  devServer: {
    allowedHosts: [
      '.skyl.local',
      'skyl.local',
    ],
    https: false,
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
    plugins: [
      // new BundleAnalyzerPlugin(),
      new ImageMinimizerPlugin({
        minimizerOptions: {
          // Lossless optimization with custom option
          // Feel free to experiment with options for better result for you
          plugins: [
            ['gifsicle', { interlaced: true }],
            ['jpegtran', { progressive: true }],
            ['optipng', { optimizationLevel: 5 }],
            [
              'svgo',
              {
                plugins: [
                  {
                    removeViewBox: false,
                  },
                ],
              },
            ],
          ],
        },
      }),
    ],
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
