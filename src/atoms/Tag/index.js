// @flow
import React from 'react';
import classnames from 'classnames';

import './Tag.scss';

type Props = {
  children: any,
  className: string,
}

const Tag = (props: Props) => {
  const { children, className } = props;
  const classNames = classnames('Tag', className);

  return <p className={classNames}>{children}</p>;
};

Tag.defaultProps = {
  children: 'Label',
  className: '',
};

export default Tag;
