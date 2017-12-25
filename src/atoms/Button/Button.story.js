import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Button from './index'

const stories = storiesOf('Button', module)

stories.add('with text', () => <Button>Hello Button</Button>)

stories.add('with Click event', () => <Button onClick={action('Clicked')}>Hello Button</Button>)
