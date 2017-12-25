// load the default config generator.
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js')
const path = require('path')

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env)

  // Extend it as you need.
  // For example, add typescript loader:
  config.module.rules.push({
    test: /\.s?css$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
      },
      {
        loader: 'sass-loader',
        options: {
          includePaths: ['./src', './node_modules'],
        },
      },
    ],
  })

  config.resolve.extensions.push('.ts', '.tsx')
  return config
}
