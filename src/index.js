import React from 'react';
import { render } from 'react-dom';
import 'reset-css/reset.css';

import './assets/index.css';

import App from './App';

const renderApp = NextApp => {
  render(<NextApp />, document.querySelector('[data-js="root"]'));
};

renderApp(App);

// It means we have hot realod working
if (module.hot) {
  // We'll check in app.js and it children every change
  module.hot.accept('./App', () => {
    // Then, we'll require the App.js again and pass to renderApp function to be render
    // with the new changes

    /* eslint-disable */
    const NextApp = require('./App').default;
    /* eslint-enable */

    renderApp(NextApp);
  });
}
