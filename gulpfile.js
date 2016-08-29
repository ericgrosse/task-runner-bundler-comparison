// Gulp imports
const gulp = require('gulp');
const minifyCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const cond = require('gulp-cond');
const eslint = require('gulp-eslint');
const livereload = require('gulp-livereload');
const mocha = require('gulp-mocha');
const nodemon = require('gulp-nodemon');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const minifyJS = require('gulp-uglify');
const gutil = require('gulp-util');

// Other libraries
const browserify = require('browserify');
const del = require('del');
const hmr = require('browserify-hmr');
const assign = require('lodash.assign');
const runSequence = require('run-sequence');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const watchify = require('watchify');
const {argv} = require('yargs');
require('babel-core/register'); // Needed for mocha tests

// If gulp was called in the terminal with the --prod flag, set the node environment to production
if (argv.prod) {
  process.env.NODE_ENV = 'production';
}
let PROD = process.env.NODE_ENV === 'production';

// Configuration
const src = 'app';
const config = {
  port: PROD ? 8080 : 3000,
  paths: {
    baseDir: PROD ? 'build' : 'dist',
    html: src + '/index.html',
    entry: src + '/index.js',
    js: src + '/**/*.js',
    test: src +'/**/*.test.js',
    css: src + '/**/*.scss',
    fonts: src + '/fonts/**/*'
  }
};

// Browserify specific configuration
const b = browserify({
  entries: [config.paths.entry],
  debug: true,
  plugin: PROD ? [] : [hmr, watchify],
  cache: {},
  packageCache: {}
})
.transform('babelify');
b.on('update', bundle);
b.on('log', gutil.log);

/**
* Gulp Tasks
**/

// Clears the contents of the dist and build folder
gulp.task('clean', () => {
  return del(['dist/**/*', 'build/**/*']);
});

// Linting
gulp.task('lint', () => {
  return gulp.src(config.paths.js)
  .pipe(eslint())
  .pipe(eslint.format())
});

// Unit tests
gulp.task('test', () => {
  return gulp.src(config.paths.test, {read: false})
  .pipe(mocha());
});

// Copies our index.html file from the app folder to either the dist or build folder, depending on the node environment
gulp.task('html', () => {
  return gulp.src(config.paths.html)
  .pipe(gulp.dest(config.paths.baseDir))
  .pipe(cond(!PROD, livereload()));
});

// Bundles our vendor and custom CSS. Sourcemaps are used in development, while minification is used in production.
gulp.task('css', () => {
  return gulp.src(
    [
      'node_modules/bootstrap/dist/css/bootstrap.css',
      'node_modules/font-awesome/css/font-awesome.css',
      config.paths.css
    ]
  )
  .pipe(cond(!PROD, sourcemaps.init()))
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('bundle.css'))
  .pipe(cond(PROD, minifyCSS()))
  .pipe(cond(!PROD, sourcemaps.write()))
  .pipe(gulp.dest(config.paths.baseDir))
  .pipe(cond(!PROD, livereload()));
});


// Bundles our JS (see the helper function at the bottom of the file)
gulp.task('js', bundle);

// Copies fonts into either the dist or build folder, depending on the node environment
gulp.task('fonts', () => {
  return gulp.src([config.paths.fonts, 'node_modules/font-awesome/fonts/**'])
  .pipe(gulp.dest(config.paths.baseDir + '/fonts'));
});

// Runs an Express server defined in app.js
gulp.task('server', () => {
  nodemon({
    script: 'server.js'
  });
});

// Re-runs specific tasks when certain files are changed
gulp.task('watch', () => {
  livereload.listen({basePath: 'dist'});

  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.css, ['css']);
  gulp.watch(config.paths.js, () => {
    runSequence('lint', 'test');
  });
});

// Default task, bundles the entire app and hosts it on an Express server
gulp.task('default', (cb) => {
  runSequence('clean', 'lint', 'test', 'html', 'css', 'js', 'fonts', 'server', 'watch', cb);
});

// Bundles our JS using browserify. Sourcemaps are used in development, while minification is used in production.
function bundle() {
  return b.bundle()
  .on('error', gutil.log.bind(gutil, 'Browserify Error'))
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(cond(PROD, minifyJS()))
  .pipe(cond(!PROD, sourcemaps.init({loadMaps: true})))
  .pipe(cond(!PROD, sourcemaps.write()))
  .pipe(gulp.dest(config.paths.baseDir));
}