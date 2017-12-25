const path = require('path');
const webpack = require('webpack');

const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanFolderPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src', 'index'),

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-[hash].js', // set a name to work well with browser cache
  },

  plugins: [
    // Set NODE_ENV to be PROD
    new webpack.DefinePlugin({
      'proccess.env': {
        NODE_ENV: '"production"',
      },
    }),
    // Plugin to generate dinamically our html file
    new HtmlPlugin({
      template: path.join(__dirname, 'src', 'assets', 'template.html'),
    }),
    // Plugin to generate a separate css file and do not insert all of them into header tag
    new ExtractTextPlugin('[name]-[hash].css'),
    // minify JS and CSS
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
    }),
    // Reduce qnty. of modules to generate
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CleanFolderPlugin(path.join(__dirname, 'dist')),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        include: /src/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: /src/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        include: [/src/, /node_modules\/reset-css/],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader'],
        }),
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
        },
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/octet-stream',
        },
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'image/svg+xml',
        },
      },
    ],
  },
};
