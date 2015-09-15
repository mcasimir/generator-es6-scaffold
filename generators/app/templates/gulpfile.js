var gulp     = require('gulp');
var del      = require('del');
var babel    = require('gulp-babel');
var jasmine  = require('gulp-jasmine');
var jshint   = require('gulp-jshint');

gulp.task('clean', function(done) {
  del(['./dist']).then(function(){
    setTimeout(done, 2000); // Let windows complete deletion
  });
});

gulp.task('build', ['clean'], function () {
  return gulp.src('es6/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('es6/**/*.js',  ['build']);
});

gulp.task('test', ['build', 'lint'], function () {
  return gulp.src(['test/**/*.specs.js', 'test/**/*.test.js'])
      .pipe(jasmine());
});

gulp.task('lint', function() {
  return gulp.src(['./lib/es6/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('default', ['build', 'watch']);
