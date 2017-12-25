// @flow
import React from 'react'

import './Button.css'

type Props = {
  children: any,
}

const Button = (props: Props) => {
  const { children, onClick } = props
  return <button className="Button">{children}</button>
}

export default Button
