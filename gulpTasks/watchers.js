const gulp = require('gulp')

module.exports = () => {
  gulp.task('watch', () => {
    gulp.watch('src/**/*.pug', ['pug'])
    gulp.watch('src/**/*.css', ['css'])
    gulp.watch('src/**/*.ts', ['ts'])
  })
}
