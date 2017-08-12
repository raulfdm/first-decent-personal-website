const gulp = require('gulp')
const gulpIF = require('gulp-if')
const imagemin = require('gulp-imagemin')

module.exports = options => {
  gulp.task('image', () => {
    return gulp
      .src('src/img/**/*')
      .pipe(
        gulpIF(
          options.production,
          imagemin([
            imagemin.jpegtran({
              progressive: true,
            }),
            imagemin.optipng({
              optimizationLevel: 5,
            }),
          ]),
        ),
      )
      .pipe(gulp.dest(options.destPath + 'img/'))
  })
}
