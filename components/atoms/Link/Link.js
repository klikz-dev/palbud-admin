import classNames from 'classnames'
import NextLink from 'next/link'
import PropTypes from 'prop-types'
import styles from './Link.module.scss'

export default function TextLink({
  color,
  size,
  href,
  urlExternal,
  className,
  children,
  ...props
}) {
  const buttonClassNames = classNames(
    styles.button,
    styles[color],
    styles[size],
    className
  )

  return urlExternal || href.includes('recommends') || href.includes('http') ? (
    <a
      href={href}
      className={color === 'text' ? '' : buttonClassNames}
      target='_blank'
      rel='noreferrer'
      {...props}
    >
      {children}
    </a>
  ) : (
    <NextLink
      href={href}
      className={color === 'text' ? '' : buttonClassNames}
      {...props}
    >
      {children}
    </NextLink>
  )
}

TextLink.propTypes = {
  color: PropTypes.oneOf(['text', 'black', 'red']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'full']),
  href: PropTypes.string.isRequired,
  urlExternal: PropTypes.bool,
  className: PropTypes.string,
  props: PropTypes.object,
}

TextLink.defaultProps = {
  color: 'black',
  size: 'md',
  urlExternal: false,
}
