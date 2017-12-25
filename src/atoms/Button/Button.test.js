import React from 'react';
import Button from './index';
import { shallow } from 'enzyme';

describe('<Button/>', () => {
  it('should render a button tag when mount', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.find('button'));
  });

  it('should render a button tag with a default Value if not pass a children', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.text()).toBeTruthy();
  });

  it('should contain a .Button class', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.hasClass('Button')).toBeTruthy();
  });

  it('should receive a custom class', () => {
    const wrapper = shallow(<Button className="my-custom-class" />);
    expect(wrapper.hasClass('my-custom-class')).toBeTruthy();
  });

  it('should receive more than one custom class', () => {
    const wrapper = shallow(<Button className="my-custom-class second-class" />);
    expect(wrapper.hasClass('my-custom-class second-class')).toBeTruthy();
  });

  it('should receive a custom Style', () => {
    const styles = {
      backgroundColor: 'black',
    };
    const wrapper = shallow(<Button styles={styles} />);
    expect(wrapper.find('button').props().style).toEqual(styles);
  });
});
