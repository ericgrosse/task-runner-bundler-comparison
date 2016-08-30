const fs = require('fs');
const cheerio = require('cheerio');
const colors = require('colors');

const PROD = process.env.NODE_ENV === 'production';
const baseDir = PROD ? 'build' : 'dist';

fs.readFile('app/index.html', 'utf8', (err, markup) => {
  const loadMarkup = cheerio.load(markup);
  
  if (err) {
    return console.log(err);
  }

  if (PROD) {
    loadMarkup('head').prepend('<link rel="stylesheet" href="bundle.css">');
  }

  fs.writeFile(baseDir + '/index.html', loadMarkup.html(), 'utf8', (err) => {
    err ? console.log(error) : console.log(`index.html written to /${baseDir}`.green);
  });
});