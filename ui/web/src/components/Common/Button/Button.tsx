/** React imports */
import React from 'react';
import cx from 'classnames';

/** Styles */
import './Button.scss';

/** Component properties interface */
interface ButtonComponentProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  modifier: 'default' | 'outlined' | 'secondary';
}

function ButtonComponent(props: ButtonComponentProps) {
  const { children, className, icon, modifier, ...elementProps } = props;

  return (
    <button
      className={cx('button-component', className, {
        [modifier]: modifier,
        disabled: elementProps.disabled,
      })}
      {...elementProps}
    >
      {icon && icon}
      {children}
    </button>
  );
}

/** Exports */
export default ButtonComponent;
