import { Link } from 'react-router-dom';
import Icon from '@/components/shared/Icon';
import { cn } from '@/utils/cn';

/**
 * One button that renders as <Link>, <a> or <button> depending on the props
 * it is given — so callers never have to think about the element.
 */
export default function Button({
  to,
  href,
  variant,
  size,
  block,
  icon = 'arrowRight',
  showIcon = true,
  className,
  children,
  ...rest
}) {
  const classes = cn(
    'btn',
    variant && `btn--${variant}`,
    size && `btn--${size}`,
    block && 'btn--block',
    className
  );

  const content = (
    <>
      {children}
      {showIcon && icon && <Icon name={icon} size={17} />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    const external = href.startsWith('http');
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
