const gulp = require('gulp')

module.exports = options => {
  gulp.task('copy-files:cname', () =>
    gulp.src('src/CNAME').pipe(gulp.dest(options.destPath)),
  )
  gulp.task('copy-files:google-html', () =>
    gulp
      .src('src/google-site-verification: google13191576035e3ffb.html')
      .pipe(gulp.dest(options.destPath)),
  )
}
