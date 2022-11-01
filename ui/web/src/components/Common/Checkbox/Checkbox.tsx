/** React imports */
import React from 'react';
import cx from 'classnames';

/** Styles */
import './Checkbox.scss';

/** Component properties interface */
interface CheckboxComponentProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  color?: 'primary' | 'system';
  onClick?: React.MouseEventHandler<HTMLElement>;
}
function CheckboxComponent(props: CheckboxComponentProps) {
  const { color = 'primary', onClick, ...elementProps } = props;

  return (
    <label className="checkbox-container">
      <input {...elementProps} type="checkbox" />
      <span
        className={cx('checkbox-container__checkmark', {
          [color]: color,
        })}
        onClick={onClick}
      />
    </label>
  );
}

/** Exports */
export default CheckboxComponent;
