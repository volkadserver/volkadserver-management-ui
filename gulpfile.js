var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify'); 
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var haml = require('gulp-haml');
 
gulp.task('browserify', function() {
  var bundler = watchify(browserify('./app/main.jsx', watchify.args));
  bundler.transform(reactify);
  bundler.transform(babel);
  bundler.on('update', function() {
    return bundler.bundle()
      .on('error', function(err) { console.log('Error while re-compiling'); })
      .pipe(source('main.js'))
      .pipe(gulp.dest('./build/js/'));
  });
});

gulp.task('haml', function () {
  gulp.src('./app/haml/*.haml')
    .pipe(haml())
    .pipe(gulp.dest('./build'));
});

gulp.task('watch', function() {
  gulp.watch('./app/haml/*.haml', ['haml']);
});


gulp.task('default', ['watch', 'browserify', 'haml']);
