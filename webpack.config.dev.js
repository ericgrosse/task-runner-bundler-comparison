const path = require('path');
const webpack = require('webpack');

const src = 'app';

module.exports = {
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  noInfo: false,
  entry: [
    'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
    './' + src + '/index'
  ],
  target: 'web',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: 'http://localhost:3000/', // localhost needed because of an issue interpreting urls in CSS files
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './' + src
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, src), loaders: ['babel']},
      {test: /(\.css|\.scss)$/, loaders: ['style', 'css?sourceMap', 'resolve-url', 'sass?sourceMap']},
      {test: /\.(svg|png|jpe?g|gif)(\?\S*)?$/, loader: 'url?limit=100000&name=img/[name].[ext]'},
      {test: /\.(eot|woff|woff2|ttf)(\?\S*)?$/, loader: 'url?limit=100000&name=font/[name].[ext]'}
    ]
  },
  sassLoader: {
    includePaths: [path.resolve('./' + src)]
  },
  resolve: {
    root: [path.resolve('./' + src)]
  }
};