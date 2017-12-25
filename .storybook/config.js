import { configure } from '@storybook/react';
import path from 'path';

/*
Require is a object from webpack which allow us to create our own context
passing:
- the directory to read
- flag to include or exclude subdirectories (true means include)
- a pattern to webpack match all the files which contains it
*/
const req = require.context('../src/', true, /\.story\.js$/);

function loadStories() {
  /*
  Then, we'll have 'keys' method which will provide us all files found on 'context' method
  it will be path+file, for instance (from src): ./components/title/Title.story.js
  */
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
