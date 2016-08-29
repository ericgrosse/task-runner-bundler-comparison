// Imports
const config = require('./webpack.config.dev');
const express = require('express');
const open = require('open');
const path = require('path');
const webpack = require('webpack');

// Other variables
const app = express();
const compiler = webpack(config);
const port = process.env.NODE_ENV === 'production' ? 8080: 3000;
const src = 'app';

// Webpack middleware
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

// Static middleware
app.use(express.static(path.join(__dirname, src + '/fonts')));
app.use(express.static(path.join(__dirname, src + '/styles')));

// API routes
app.get('/api/sample-route', (req, res) => {
  res.send({
    website: 'Toptal',
    blogPost: true
  });
});

// Client routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './', src ,'/index.html'));
});

app.listen(port, () => {
  open('http://localhost:' + port);
});