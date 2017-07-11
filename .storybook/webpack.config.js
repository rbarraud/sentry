const path = require('path');

const staticPath = path.resolve(__dirname, '..', 'src', 'sentry', 'static', 'sentry');
const componentPath = path.resolve(staticPath, 'app', 'components');

const [appConfig, legacyCssConfig] = require('../webpack.config');

module.exports = {
  module: {
    rules: [
      {
        test: /\.po$/,
        loader: 'po-catalog-loader',
        query: {
          referenceExtensions: ['.js', '.jsx'],
          domain: 'sentry'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg|png|gif|ico|jpg)($|\?)/,
        loader: 'file-loader?name=' + '[name].[ext]'
      }
    ]
  },
  resolve: {
    alias: Object.assign({}, appConfig.resolve.alias, {
      'sentry-ui': componentPath
    })
  }
};