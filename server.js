// Imports
const compression = require('compression');
const config = require('./webpack.config.dev');
const express = require('express');
const open = require('open');
const path = require('path');
const webpack = require('webpack');

// Other variables
const app = express();
const compiler = webpack(config);
const PROD = process.env.NODE_ENV === 'production';
const port = PROD ? 8080: 3000;
const indexBase = PROD ? 'build' : 'app';

if (PROD) {
  app.use(compression());
  app.use(express.static('build'));
}
else {
  // Webpack middleware
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}

// API routes
app.get('/api/sample-route', (req, res) => {
  res.send({
    website: 'Toptal',
    blogPost: true
  });
});

// Client routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './', indexBase, '/index.html'));
});

app.listen(port, () => {
  open(`http://localhost:${port}`);
});