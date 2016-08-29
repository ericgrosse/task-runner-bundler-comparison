const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const src = 'app';
const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};

module.exports = {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: './' + src + '/index',
  target: 'web',
  output: {
    path: __dirname + '/build',
    publicPath: 'http://localhost:3000/', // localhost needed because of an issue interpreting urls in CSS files
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './build'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('bundle.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, src), loaders: ['babel']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')},
      {test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap!resolve-url!sass?sourceMap')},
      {test: /\.(svg|png|jpe?g|gif)(\?\S*)?$/, loader: 'url?limit=100000&name=img/[name].[ext]'},
      {test: /\.(eot|woff|woff2|ttf)(\?\S*)?$/, loader: 'url?limit=100000&name=fonts/[name].[ext]'}
    ]
  },
  sassLoader: {
    includePaths: [path.resolve('./' + src)]
  },
  resolve: {
    root: [path.resolve('./' + src)]
  }
};