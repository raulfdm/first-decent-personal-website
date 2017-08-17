const gulp = require('gulp')
const lazypipe = require('lazypipe')
const uglify = require('gulp-uglify')
const maps = require('gulp-sourcemaps')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const tsify = require('tsify')
const gulpIF = require('gulp-if')

module.exports = options => {
  gulp.task('ts', () => {
    const initMaps = lazypipe().pipe(() =>
      gulpIF(!options.production, maps.init({ loadMaps: true })),
    )
    const writeMaps = lazypipe().pipe(() =>
      gulpIF(!options.production, maps.write('./')),
    )

    return browserify({
      basedir: '.',
      debug: true,
      entries: ['src/ts/index.ts'],
      cache: {},
      packageCache: {},
    })
      .plugin(tsify)
      .transform('babelify', {
        presets: ['es2015'],
        extensions: ['.ts'],
      })
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(initMaps())
      .pipe(gulpIF(options.production, uglify()))
      .pipe(writeMaps())
      .pipe(gulp.dest('dist'))
  })
}
