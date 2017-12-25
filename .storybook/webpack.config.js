// load the default config generator.
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js')
const path = require('path')

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env)

  // Extend it as you need.
  // For example, add typescript loader:
  config.module.rules.push({
    test: /\.css$/,
    include: [path.resolve(__dirname, 'not_exist_path')], //Fix Unknow word
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          import: false,
          importLoaders: 2,
          root: '.',
        },
      },
      'resolve-url-loader',
      {
        loader: 'postcss-loader',

        options: {
          config: {
            path: path.join(__dirname, '..', 'postcss.config.js'),
          },
        },
      },
    ],
  })

  config.resolve.alias['settings'] = path.resolve(__dirname, '..', 'src', 'settings')

  config.resolve.extensions.push('.ts', '.tsx')
  return config
}
