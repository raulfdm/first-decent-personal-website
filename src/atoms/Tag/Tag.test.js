import React from 'react';
import { shallow } from 'enzyme';

import Tag from './index';

describe('<Tag />', () => {
  it('should render a p when mount', () => {
    const wrapper = shallow(<Tag />);
    expect(wrapper.find('p').length).toBe(1);
  });

  it('should render a p with a text', () => {
    const wrapper = shallow(<Tag>React</Tag>);
    expect(wrapper.text()).toBe('React');
  });

  it('should has a default value and use it when doenst receive a children', () => {
    const wrapper = shallow(<Tag />);
    expect(wrapper.text()).toBe('Label');
  });

  it('should has a default class', () => {
    const wrapper = shallow(<Tag />);
    expect(wrapper.hasClass('Tag')).toBeTruthy();
  });

  it('should accept a custom class', () => {
    const wrapper = shallow(<Tag className="my-class" />);
    expect(wrapper.hasClass('my-class')).toBeTruthy();
  });
});
