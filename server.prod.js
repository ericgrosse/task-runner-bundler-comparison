// Imports
const compression = require('compression');
const express = require('express');
const open = require('open');
const path = require('path');

// Other variables
const app = express();
const port = 8080;

app.use(compression());
app.use(express.static('build'));

// API routes
app.get('/api/sample-route', (req, res) => {
  res.send({
    website: 'Toptal',
    blogPost: true
  });
});

// Client routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './build/index.html'));
});

app.listen(port, () => {
  open('http://localhost:' + port);
});