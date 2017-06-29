const gulp = require('gulp');
const browser = require('browser-sync');
const pug = require('gulp-pug');
const babel = require('gulp-babel');

gulp.task('default',['babel'],function(){
  gulp.start('pug')
})
gulp.task("babel", function () {
  return gulp.src("src/js/app.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"));
});

gulp.task('pug', function buildHTML() {
  return gulp.src('src/index.pug')
    .pipe(pug({}))
    .pipe(gulp.dest('dist/'))
});

gulp.task('server', () => {

  browser.init({
    server: {
      baseDir: 'dist/'
    }
  });

  gulp.watch('src/**/*.pug', ['default']);
  gulp.watch('src/**/*.*').on('change', browser.reload);
});
