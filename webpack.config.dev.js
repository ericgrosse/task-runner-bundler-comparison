const path = require('path');
const webpack = require('webpack');

module.exports = {
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  noInfo: false,
  entry: [
    'webpack-hot-middleware/client?reload=true', // reloads the page if hot module reloading fails.
    './app/index'
  ],
  target: 'web',
  output: {
    path: __dirname + '/dist',
    publicPath: 'http://localhost:3000/', // localhost needed because of an issue interpreting urls in CSS files
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './app'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'app'), loaders: ['babel']},
      {test: /(\.css|\.scss)$/, loaders: ['style', 'css?sourceMap', 'resolve-url', 'sass?sourceMap']},
      {test: /\.(svg|png|jpe?g|gif)(\?\S*)?$/, loader: 'url?limit=100000&name=img/[name].[ext]'},
      {test: /\.(eot|woff|woff2|ttf)(\?\S*)?$/, loader: 'url?limit=100000&name=fonts/[name].[ext]'}
    ]
  },
  sassLoader: {
    includePaths: [path.resolve('./app')]
  },
  resolve: {
    root: [path.resolve('./app')]
  }
};