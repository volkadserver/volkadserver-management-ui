var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var concat = require('gulp-concat');
var babelify = require('babelify');
var haml = require('gulp-haml');

watchify.args.debug = true;
 
var bundler = watchify(browserify('./app/main.jsx', watchify.args));
bundler.transform(babelify);
bundler.on('update', bundle);

function bundle() {
  console.log('Bundling browserify bundle');
  return bundler.bundle()
    .on('error', function(err) { console.log('[GULP]', err.name, err.message ); })
    .pipe(source('main.js'))
    .pipe(gulp.dest('./build/js/'));
}

gulp.task('browserify', function() {
  return bundle();
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
