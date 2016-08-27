const gulp = require('gulp');
const browserify = require('browserify');
const watchify = require('watchify');
const assign = require('lodash.assign');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const gulpSequence = require('gulp-sequence');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const del = require('del');
const open = require('gulp-open');
const livereload = require('gulp-livereload');
livereload.listen({basePath: 'dist'});
require('babel-core/register'); // Needed for mocha tests

const browserifyOptions = {
  entries: ['./app/index.js'],
  debug: true
};
const opts = assign({}, watchify.args, browserifyOptions);
const b = watchify(browserify(opts));
b.transform('babelify')
b.on('update', bundle);
b.on('log', gutil.log);

gulp.task('server', () => {
  nodemon({
    script: 'app.js'
  });
});

gulp.task('open', ['server'], () => {
  gulp.src('dist/index.html')
  .pipe(open({uri: 'http://localhost:3000/'}));
});

gulp.task('clean', () => {
  return del('./dist/**/*');
});

gulp.task('test', () => {
  return gulp.src('./app/**/*.test.js', {read: false})
  .pipe(mocha());
});

gulp.task('lint', () => {
  return gulp.src('./app/**/*.js')
  .pipe(eslint())
  .pipe(eslint.format())
});

gulp.task('js', bundle);

gulp.task('html', () => {
  return gulp.src('./app/index.html')
  .pipe(gulp.dest('./dist'))
  .pipe(livereload());
});

gulp.task('css', () => {
  return gulp.src(
    [
      'node_modules/bootstrap/dist/css/bootstrap.css',
      'node_modules/font-awesome/css/font-awesome.css',
      './app/**/*.scss'
    ]
  )
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('bundle.css'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./dist'))
  .pipe(livereload());
});

gulp.task('fonts', () => {
  return gulp.src('node_modules/font-awesome/fonts/**')
  .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('watch', () => {
  gulp.watch('./app/index.html', ['html']);
  gulp.watch('./app/**/*.scss', ['css']);
  gulp.watch('./app/**/*.js', () => {
    runSequence('lint', 'test');
  });
});

gulp.task('default', (cb) => {
  runSequence('clean', 'lint', 'test', 'html', 'css', 'js', 'fonts', 'open', 'watch', cb);
});

function bundle() {
  return b.bundle()
  .on('error', gutil.log.bind(gutil, 'Browserify Error'))
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./dist'))
  .pipe(livereload());
}