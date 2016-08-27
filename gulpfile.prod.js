const minifyJS = require('gulp-uglify');
const minifyCSS = require('gulp-clean-css');

gulp.task('set-prod-node-env', () => {
  return process.env.NODE_ENV = 'production';
});

gulp.task('build-fonts', () => {
  return gulp.src('node_modules/font-awesome/fonts/**')
  .pipe(gulp.dest('./build/fonts'));
});

gulp.task('build-js', () => {
  return b.bundle()
  .on('error', gutil.log.bind(gutil, 'Browserify Error'))
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(minifyJS())
  .pipe(gulp.dest('./build'))
});

gulp.task('build-css', () => {
  return gulp.src(
    [
      'node_modules/bootstrap/dist/css/bootstrap.css',
      'node_modules/font-awesome/css/font-awesome.css',
      './app/**/*.scss'
    ]
  )
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('bundle.css'))
  .pipe(minifyCSS())
  .pipe(gulp.dest('./build'))
});

gulp.task('build', ['set-prod-node-env', 'build-js', 'build-css', 'build-fonts'], () => {
  gulp.src('./app/index.html')
  .pipe(gulp.dest('./build'));
});