'use strict';
// generated on 2014-10-22 using generator-gulpx 0.0.9
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var serverPort = 8081;
var defaultTask = ['connect', 'broswer', 'watchless'];

gulp.task('connect', function() {
  $.connect.server({
    root: 'app',
    port: serverPort,
    livereload: true
  });

  gulp.watch(['app/*', 'app/css/*.css', 'app/js/*.js', 'app/img/*'], ['pageReload']);
});

gulp.task('pageReload', function() {
  gulp.src('app/')
    .pipe($.connect.reload());
});

gulp.task("broswer", ['connect'], function(){
  gulp.src("app/index.html")
  .pipe($.open("", {url: "http://localhost:" + serverPort}));
});

// compile less files
gulp.task('less', function () {
    gulp.src('app/css/less/*.less')
    .pipe($.sourcemaps.init())
    .pipe($.less())
    .on('error', console.error.bind('error'))
    .pipe($.sourcemaps.write('maps'))
    .pipe(gulp.dest('app/css'));
});

gulp.task('watchless', function() {
    gulp.watch('app/css/less/*.less', function() {
        gulp.start('less');
    });
});

defaultTask.push('watchless');

gulp.task('default', defaultTask);
