const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};
const PROD = process.env.NODE_ENV === 'production';

module.exports = {
  debug: true,
  devtool: PROD ? 'source-map' : 'eval-source-map',
  noInfo: false,
  entry: PROD ? './app/index' :
  [
    'webpack-hot-middleware/client?reload=true', // reloads the page if hot module reloading fails.
    './app/index'
  ],
  target: 'web',
  output: {
    path: PROD ? __dirname + '/build' : __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: PROD ? './build' : './app'
  },
  plugins: PROD ?
  [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('bundle.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
  ] :
  [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'app'), loaders: ['babel']},
      {
        test: /\.css$/,
        loader: PROD ?
          ExtractTextPlugin.extract('style', 'css?sourceMap'):
          'style!css?sourceMap'
      },
      {
        test: /\.scss$/,
        loader: PROD ? 
          ExtractTextPlugin.extract('style', 'css?sourceMap!resolve-url!sass?sourceMap') :
          'style!css?sourceMap!resolve-url!sass?sourceMap'
      },
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