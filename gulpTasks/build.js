const gulp = require('gulp')
const sequence = require('gulp-sequence')

module.exports = options => {
  gulp.task('build', ['clean'], callback => {
    options.production
      ? sequence(
          ['css', 'ts', 'image'],
          ['copy-files:cname', 'copy-files:google-html', 'revision'],
          'pug',
        )(callback)
      : sequence(['css', 'ts', 'image'], 'pug')(callback)
  })
}
