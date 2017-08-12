const gulp = require('gulp')
const data = require('gulp-data')
const pug = require('gulp-pug')
const path = require('path')

module.exports = options => {
  gulp.task('pug', () => {
    return gulp
      .src('src/index.pug')
      .pipe(
        data(() => {
          const result = {
            projects: require('../src/data/projects.json'),
            about: require('../src/data/about.json'),
            abilities: require('../src/data/skills.json'),
          }

          if (options.production)
            result.assets = require('../src/data/rev-manifest.json')

          return result
        }),
      )
      .pipe(pug({}))
      .pipe(gulp.dest(options.destPath))
  })
}
