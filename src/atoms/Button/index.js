// @flow
import React from 'react';
import classnames from 'classnames';

import './Button.scss';

type Props = {
  children: any,
  className: string,
  styles: {},
  onClick?: SyntheticEvent<HTMLButtonElement>,
}

const Button = (props: Props) => {
  const {
    children, onClick, className, styles,
  } = props;

  const classNames = classnames('Button', className);

  return (
    <button style={styles} className={classNames} onClick={onClick}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  children: 'Button',
  className: '',
  styles: {},
};

export default Button;
