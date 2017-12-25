const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const config = require('./webpack.config');

const app = express();
const compiler = webpack(config);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    }
  }),
);

app.use(require('webpack-hot-middleware')(compiler));

app.listen(3000, () => {
  console.log('Running on http://localhost:3000\n');
});
