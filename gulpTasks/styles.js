const autoprefixer = require('autoprefixer')
const cssnano = require('gulp-cssnano')
const gulp = require('gulp')
const gulpIF = require('gulp-if')
const postcss = require('gulp-postcss')
const postImport = require('postcss-import')
const rename = require('gulp-rename')

module.exports = options => {
  gulp.task('css', () => {
    return gulp
      .src('src/css/index.css')
      .pipe(postcss([autoprefixer(), postImport()]))
      .pipe(gulpIF(options.production, cssnano()))
      .pipe(
        gulpIF(
          options.production,
          rename({
            suffix: '.min',
          }),
        ),
      )
      .pipe(gulp.dest(options.destPath))
  })
}
