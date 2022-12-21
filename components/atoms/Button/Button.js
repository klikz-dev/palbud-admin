import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Button.module.scss'

export default function Button({
  color,
  size,
  onClick,
  disabled,
  className,
  children,
  ...props
}) {
  const buttonClassNames = classNames(
    styles.button,
    styles[color],
    styles[size],
    disabled && styles.disabled,
    className
  )

  return (
    <button
      className={buttonClassNames}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  color: PropTypes.oneOf(['indigo', 'transparent']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'full']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  props: PropTypes.object,
}

Button.defaultProps = {
  color: 'indigo',
  size: 'md',
  disabled: false,
}
