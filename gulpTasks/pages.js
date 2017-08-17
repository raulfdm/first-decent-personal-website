const gulp = require('gulp')
const ghPages = require('gulp-gh-pages')

module.exports = options => {
  gulp.task('pages', () => {
    return gulp.src(options.destPath + '**/*').pipe(ghPages())
  })
}
