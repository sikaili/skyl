module.exports = {
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
};
