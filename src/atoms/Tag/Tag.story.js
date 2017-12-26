import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import '../../assets/index.scss';

import Tag from './index';

const stories = storiesOf('Tag', module);

stories.add('default', () => <Tag />);
stories.add('With some text', () => <Tag>React</Tag>);
stories
  .addDecorator(story => {
    return (
      <div
        style={{
          display: 'flex',
          width: 145,
          justifyContent: 'space-around',
        }}
      >
        {story()}
      </div>
    );
  })
  .add('More than one', () => {
    return [<Tag>React</Tag>, <Tag>Webpack</Tag>];
  });
