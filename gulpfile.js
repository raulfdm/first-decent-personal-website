const gulp = require('gulp')
const glob = require('glob')

const options = {
  destPath: 'dist/',
  production: Boolean(process.env.PROD) || false,
  manifestConfig: {
    merge: true,
    manifestName: 'rev-manifest.json',
    manifestPath: 'src/data/',
  },
}

glob
  .sync('./gulpTasks/**/*.js', { realpath: true })
  .map(file => require(file)(options))
