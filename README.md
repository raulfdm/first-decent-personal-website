# Personal React Boilerplate

> Structure to initialize from scratch a React project (without create-react-app)

## Tools

* [Webpack](https://webpack.js.org/) `v3.10ˆ`;
* [PostCSS](http://postcss.org/): To improve CSS code and keep compatibility using tool kit;
* [Flow](https://flow.org/en/): A static type checker for JavaScript;
* [Eslint](https://eslint.org/): Based on airbnb style with some exceptions;
* [Jest](https://facebook.github.io/jest/): To test our scripts and components;
* Live/Hot Reload:
  * [Webpack dev Middleware](https://github.com/webpack/webpack-dev-middleware): Using an Express server to put webpack server inside;
  * [Webpack Hot Middleware](https://github.com/glenjamin/webpack-hot-middleware): To `webpack dev middleware` reload in which file change;
* File extensions already configured to use:
  * `.css`
  * `.png`
  * `.jpg`
  * `.svg`
  * `.gif`
  * `.wof`
  * `.woff2`
  * `.ttf`
  * `.eot`

### Optional tools

* Sass
* CSS Modules
* Global files
* ... and more

To see how to use these ones and more, just check at [Tips and Tricks](#tips-and-tricks) section.

## Install

To install the project, follow the steps:

```bash
$ git clone https://github.com/raulfdm/react-boilerplate.git
$ cd react-boilerplate
$ yarn install
## or
$ npm install
```

<CONTINOUS HERE>

## Scripts

<details>
<summary>start</summary>

Run webpack server with hot reload at `http://localhost:3000`.

</details>

<details>
<summary>build</summary>

To build to `production` the project. All the files will be generated at `dist/` folder.

</details>

<details>
<summary>lint</summary>

Run eslint on `src/` folder to check what is or not compatible with `.eslintrc.json` rules

</details>

<details>
<summary>Test Commands</summary>

To test our application will be used [JEST](https://facebook.github.io/jest/) from Facebook. Jest
try 3 ways to identify your test files:

* `__tests__` folder;
* Any files which contains `test` in it name;
* Any file which contains `spec` in it name;

<details>
<summary>test</summary>

Will run once all tests and will stop it

</details>

<details>
<summary>test:tdd</summary>

Will run all tests and watch for changes.

</details>

<details>
<summary>test:coverage</summary>

Will run all tests and provide statistics about how many % of you code have been tested.

</details>

</details>

## Tips and Tricks

<details>
<summary>Copy messages - Webpack Dashboard</summary>

Some terminals you need to select in different way some message to copy.
[Click here](https://github.com/FormidableLabs/webpack-dashboard/issues/45) to check the issue and
the solution.

</details>

<details>
<summary>Using CSS Modules</summary>

<img src="https://raw.githubusercontent.com/css-modules/logos/master/css-modules-logo.png" alt="CSS MODULES LOGO" height="100" width="100"/>

If you want to use [CSS Modules](https://github.com/css-modules/css-modules) instead Normal CSS, you
just have to pass to CSS-LOADER a query calling that:

```javascript
{
  test: /\.css$/,
  exclude: /node_modules/,
  include: /src/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: 'css-loader?module', // Here
  }),
},
```

And you your component, you must have to import the CSS as a single object and use the name of the
classes, for instance:

```css
/* Title.css*/
.myTitle {
  font-height: 100px;
}
```

```js
import React from 'react';

import styles from './Title.css';

const Title = ({ children }) => {
  return <h1 className={styles.myTitle}>{children}</h1>;
};
```

When webpack generate the bundle, our `h1` element will have a class like bellow tag and all styles
will be applied correctly:

```html
<h1 class="AW-QNb4eDPlUP8x-8Vn44">Here is my title</h1>
```

</details>

<details>
<summary>Using SASS instead CSS</summary>
<img src="https://cdn.worldvectorlogo.com/logos/sass-1.svg" alt="Sass logo" height="80" width="150"/>

If you want to use SASS instead CSS, first install the following packages:

```
npm install --save-dev sass-loader node-sass

# or

yarn add -D sass-loader node-sass
```

In `webpack.config.js`:

1. Remove CSS RULES;
1. Remove CSS files import from the components and import `SCSS` files instead (`import
   './myStyle.scss'`);
1. Add the following `rule`:

```javascript
{
  test: /\.scss$/,
  exclude: /node_modules/,
  include: /src/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader', 'sass-loader'],
  }),
},
```

### Add SASS on Storybook
To use storybook and .scss files, you must overwrite webpack.config from `.storybook`.

> :warning: To do it, you must have installed sass-loader (step above)
1. On `.storybook` folder, create a file called `webpack.config.js`
1. Add the following code:
```javascript
// load the default config generator.
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');
const path = require('path');

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env);

  // Extend it as you need.
  // For example, add typescript loader:
  config.module.rules.push({
    test: /\.scss$/,
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
  });

  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
```

</details>

<details>
<summary>Global Dependencies</summary>

When `webpack` generate our files and bundles, each file is a module, in other words, it component
or file has it own `closure`. But in some cases we need some variables in global scope, like jQuery
for instance.

To do it, you need to use a webpack plugin called `ProvidePlugin`. To use, you have to add on plugin
list (prod and dev) and pass an option object containing the name of the global variable and the
module/code which needs to be Global:

```javascript
plugins: [
  // ... other plugins
  new webpack.ProvidePlugin({
    $: 'jquery/dist/jquery.js',
    jQuery: 'jquery/dist/jquery.js',
  }),
  // ... other plugins
];
```

In this example, even `$` and `jQuery` are words to represent jQuery, then both are necessary.

Doing that, you **do not have** to import it inside your `index.js` nether any component.

</details>

<details>
<summary>To include more folders (loaders)</summary>

Sometimes we have some dependencies we want to import from `node_modules` folder. But imagine you
need to exclude `node_modules` but you also need to include `node_modules/some-dependency`. Let's
see an example to add `meyer reset css` as a npm dependency:

```bash
yarn add reset-css
```

```javascript
// index.js

// other imports
import 'reset-css/reset.css';

// Hide code...
```

```javascript
// webpack.config (both)

{
  test: /\.css$/,
  exclude: /node_modules(?!\/reset-css)/,
  include: [/src/, /node_modules\/reset-css/],
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: 'css-loader',
  }),
},
```

In this case of `exclude`, the regex `/node_modules(?!\/reset-css)/` will exclude every
`node_modules/` children folder, except `reset-css` folder. So, when our css loader run, it will use
`reset-css` module as well.

And we also have to include it. In the case we have just a single include, we can pass an array of
regex (or string paths) to be read by loader.

Remember, is important to make both changes, otherwise when webpack try to load `reset.css` file, it
will thrown and will ask to use some CSS loader to this kind of file.

### Another Option

In CSS case, we can easily just remove `exclude` option and keep our include:

```javascript
// webpack.config (both)

{
  test: /\.css$/,
  include: [/src/, /node_modules\/reset-css/],
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: 'css-loader',
  }),
},
```

It will work without think in regex and etc., but webpack will read `node_modules`. It could be
performance problem, or not. Choose the option which make you feel more comfortable! :wink:

</details>

<details>
<summary>../../../../ ? Webpack alias please!</summary>

Sometimes when we nest our files and components and need to import something in the rootfolder, we need to do something like this:

```javascript
import Button from '../../../../../components/button'

// ...
```

What if we can do like this:

```javascript
import Button from 'components/button'

// ...
```

Yes, it's possible using webpack alias. Inside your `webpack.config` (prod as well), you must add a `resolve` option and inside it, add `alias`key which will receive an object:

```javascript
// webpack.config.js

module.exports = {
  // all the configuration

  resolve: {
    alias: {}
  }
}
```

Then, you need to add the name of the alias as a `key` and the exactly path to the folder, for instance:

```javascript
// webpack.config.js

module.exports = {
  // all the configuration

  resolve: {
    alias: {
      components: path.join(__dirname, 'src','components')
    }
  }
}
```

It means we'll have an alias named `components` which correspond on `<my root folder path>/src/components` and when webpack start to read our files to generate the bundle, it'll use this alias to solve our `import Button from 'components/button'`.

> :warning: Important :warning: : Once again, you must apply it in both `webpack.config` (prod and dev)

### Side effects: VSCODE peek and Go has gone! =(

If you use VSCODE, you know how nice is go to a file just clicking it. When we use webpack alias we lost it! :disappointed:

In this cases, there is a small trick to do and keep it working, but not 100% correctly (unfortunately). Check [How to Autocomplete ES Modules With Webpack in VSCode](https://blog.andrewray.me/autocomplete-es-modules-webpack-vscode/)

</details>


<details>
<summary>Copying static files during the build</summary>

Webpack has hundreds of useful plugins to help us build our project properly. Sometimes we want just copy some static file to `dist/`. For these cases, you can use [Copy Webpack Plugin](https://github.com/webpack-contrib/copy-webpack-plugin).

After you install it into your `webpack.config.prod.js`, import it and add in `plugins` array:

```javascript
// webpack.config.prod.js

import CopyPlugin from 'copy-webpack-plugin'

// ... code

module.exports = {
  // ... code

  plugins: [
    // ... My plugins
    new CopyPlugin({
      from: path.join(__dirname, 'assets', 'robots.txt'),
      to: path.join(__dirname, 'dist')
    })
  ]
}
```

In this case, it will copy `<root project folder>/assets/robots.txt` and paste into `dist` during the build process!

This is a simple use, the plugin contains a lot of options. I'd suggest you check the documentation page for more information.
</details>
