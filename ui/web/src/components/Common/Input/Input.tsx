/** React imports */
import React, { useState } from 'react';
import cx from 'classnames';

/** Helpers */
import { doesExists } from '../../../helpers';

/** Styles */
import './Input.scss';

/** Assets */
import { EyeIcon, EyeSlashIcon } from '../../../assets/svg/icons';

/** Component properties interface */
interface InputComponentProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  controlId: string;
  inputLabel: string;
  onHover?: React.MouseEventHandler<HTMLInputElement>;
}

function InputComponent(props: InputComponentProps) {
  const {
    className,
    controlId,
    inputLabel,
    onAnimationStart,
    onBlur,
    onHover,
    onFocus,
    type,
    ...elementProps
  } = props;
  const [isInputActive, setIsInputActive] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isInputBeingHovered, setIsInputBeingHovered] = useState(false);
  const [isInputAutoFilled, setIsInputAutoFilled] = useState(false);

  const [shouldShowPassword, setShouldShowPassword] = useState(
    type !== 'password'
  );

  const onAnimationStartInput = (
    event: React.AnimationEvent<HTMLInputElement>
  ) => {
    typeof onAnimationStart === 'function' && onAnimationStart(event);

    // On autofill animation
    if (event.animationName === 'onAutoFillStart') {
      setIsInputAutoFilled(true);
    }
  };

  const onBlurInput = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const value = event && event.target.value;
    setIsInputActive(doesExists(value));
    setIsInputFocused(false);

    typeof onBlur === 'function' && onBlur(event);
  };

  const onMouseEnterInput = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    setIsInputBeingHovered(true);
    typeof onHover === 'function' && onHover(event);
  };

  const onMouseLeaveInput = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    setIsInputBeingHovered(false);
    typeof onHover === 'function' && onHover(event);
  };

  const onFocusInput = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    setIsInputActive(true);
    setIsInputFocused(true);

    typeof onFocus === 'function' && onFocus(event);
  };

  const labelClasses = cx('input-component__label', {
    isActive: isInputActive || isInputAutoFilled,
    labelHighLight: isInputFocused,
    isHovered: isInputBeingHovered,
  });

  return (
    <div className="input-component__container">
      <label className={labelClasses} htmlFor={controlId}>
        {inputLabel}
      </label>
      <input
        className={cx('input-component', className)}
        {...elementProps}
        onAnimationStart={onAnimationStartInput}
        onBlur={onBlurInput}
        onFocus={onFocusInput}
        onMouseEnter={onMouseEnterInput}
        onMouseLeave={onMouseLeaveInput}
        type={!shouldShowPassword ? type : 'text'}
      />
      {type === 'password' && (
        <div
          className="input-component__visibility-toggle"
          onClick={() => setShouldShowPassword((prev) => !prev)}
        >
          {shouldShowPassword ? <EyeIcon /> : <EyeSlashIcon />}
        </div>
      )}
    </div>
  );
}

/** Exports */
export default InputComponent;
