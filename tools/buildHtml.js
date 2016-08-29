const fs = require('fs');
const cheerio = require('cheerio');
const colors = require('colors');

fs.readFile('app/index.html', 'utf8', (err, markup) => {
  if (err) {
    return console.log(err);
  }

  const loadMarkup = cheerio.load(markup);

  loadMarkup('head').prepend('<link rel="stylesheet" href="bundle.css">');

  fs.writeFile('build/index.html', loadMarkup.html(), 'utf8', (err) => {
    err ? console.log(error) : console.log('index.html written to /build'.green);
  });
});