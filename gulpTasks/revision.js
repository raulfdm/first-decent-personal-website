const gulp = require('gulp')
const revision = require('gulp-rev')
const revisionDelete = require('gulp-rev-delete-original')

module.exports = options => {
  gulp.task('revision', () => {
    return gulp
      .src('dist/**/*.+(css|js)')
      .pipe(revision())
      .pipe(gulp.dest(options.destPath))
      .pipe(revisionDelete())
      .pipe(revision.manifest(options.manifestConfig))
      .pipe(gulp.dest(options.manifestConfig.manifestPath))
  })
}
