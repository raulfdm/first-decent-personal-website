const gulp = require('gulp')
const clean = require('gulp-clean')

module.exports = options => {
  gulp.task('clean', () => {
    return gulp.src(options.destPath).pipe(clean())
  })
}
