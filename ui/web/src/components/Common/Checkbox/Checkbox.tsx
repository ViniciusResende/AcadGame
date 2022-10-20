/** React imports */
import React from 'react';

/** Styles */
import './Checkbox.scss';

/** Component properties interface */
interface CheckboxComponentProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onClick: React.MouseEventHandler<HTMLElement>;
}
function CheckboxComponent(props: CheckboxComponentProps) {
  const { onClick, ...elementProps } = props;

  return (
    <label className="checkbox-container">
      <input {...elementProps} type="checkbox" />
      <span className="checkbox-container__checkmark" onClick={onClick} />
    </label>
  );
}

/** Exports */
export default CheckboxComponent;
