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
const livereload = require('gulp-livereload');
livereload.listen({basePath: 'dist'});

const browserifyOptions = {
  entries: ['./app/index.js'],
  debug: true
};
const opts = assign({}, watchify.args, browserifyOptions);
const b = watchify(browserify(opts));
b.transform('babelify', {presets: ['react', 'es2015']})
b.on('update', bundle);
b.on('log', gutil.log);

gulp.task('server', () => {
  nodemon({
    script: 'app.js'
  });
});

gulp.task('lint', () => {
  return gulp.src(['./app/**/*.js', '!node_modules/**'])
  .pipe(eslint())
  .pipe(eslint.format())
});

gulp.task('bundle', bundle);

gulp.task('html', () => {
  gulp.src('./app/index.html')
  .pipe(gulp.dest('./dist'))
  .pipe(livereload());
});

gulp.task('watch', () => {
  gulp.watch('./app/index.html', ['html']);
});

gulp.task('default', ['server', 'html', 'bundle', 'watch']);

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