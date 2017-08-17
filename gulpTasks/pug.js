const gulp = require('gulp')
const data = require('gulp-data')
const pug = require('gulp-pug')
const path = require('path')
const fetch = require('node-fetch')

module.exports = options => {
  gulp.task('pug', () => {
    return gulp
      .src('src/index.pug')
      .pipe(
        data(async () => {
          try {
            const response = await fetch(
              'https://personal-website-api.firebaseio.com/infos.json',
              {},
            )
            const data = await response.json()

            if (options.production)
              data.assets = require('../src/data/rev-manifest.json')

            return data
          } catch (error) {
            console.error(error)
          }
        }),
      )
      .pipe(pug({}))
      .pipe(gulp.dest(options.destPath))
  })
}
