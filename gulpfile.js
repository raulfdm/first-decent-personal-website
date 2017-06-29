const gulp = require('gulp')
const pug = require('gulp-pug')

gulp.task('pug', function buildHTML() {
  return gulp.src('src/index.pug')
    .pipe(pug({}))
    .pipe(gulp.dest('dist/'))
});

gulp.task('css',()=>{

})

gulp.task('watch', ()=>{
  gulp.watch('src/**/*.pug', ['pug']);
  gulp.watch('src/**/*.css').on('change', browser.reload);
})
