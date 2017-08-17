const gulp = require('gulp')
const glob = require('glob')
const path = require('path')

const options = {
  destPath: path.join(__dirname, 'dist/'),
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
