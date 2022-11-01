/** React imports */
import React, { useEffect, useState } from 'react';
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
  modifier?: 'default' | 'clear';
  unitOfMeasurementTag?: string;
  validatorFunctions?: {(value: string) : string | undefined} [];
  onHover?: React.MouseEventHandler<HTMLInputElement>;
}

function InputComponent(props: InputComponentProps) {
  const {
    className,
    controlId,
    inputLabel,
    modifier = 'default',
    unitOfMeasurementTag,
    onAnimationStart,
    onBlur,
    onHover,
    onInput,
    onFocus,
    type,
    validatorFunctions,
    ...elementProps
  } = props;
  const [isInputActive, setIsInputActive] = useState(
    !!elementProps.defaultValue
  );
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isInputBeingHovered, setIsInputBeingHovered] = useState(false);
  const [isInputAutoFilled, setIsInputAutoFilled] = useState(false);
  const [shouldShowPassword, setShouldShowPassword] = useState(type !== 'password');
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  useEffect(() => {
    setIsInputActive(!!elementProps.defaultValue);
  }, [elementProps.defaultValue]);

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


  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) =>{
    const value = event && event.target.value;
    handleInputValidation(value);
  }

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

  const handleInputValidation = (value: string) => {
    
    if(validatorFunctions){
      validatorFunctions.forEach(element => {
        if(element){
          
          const err: string | undefined = element(value);
          if(err) setErrorMessage(err);
          else setErrorMessage(undefined);
        }
      });
    }
  }
  //.input-container.hasError ~ _label
  return (
    <div className="input-component__container">
      <label className={labelClasses} htmlFor={controlId}>
        {inputLabel}
      </label>
      <input
        className={cx('input-component', className, modifier, {
          hasError: errorMessage
        })}
        {...elementProps}
        onAnimationStart={onAnimationStartInput}
        onBlur={onBlurInput}
        onChange={onChangeInput}
        onFocus={onFocusInput}
        onMouseEnter={onMouseEnterInput}
        onMouseLeave={onMouseLeaveInput}
        type={!shouldShowPassword ? type : 'text'}
      />
      {errorMessage && (<span className='errorSpan'>{errorMessage}</span>)}
      {type === 'password' && (
        <div
          className="input-component__visibility-toggle"
          onClick={() => setShouldShowPassword((prev) => !prev)}
        >
          {shouldShowPassword ? <EyeIcon /> : <EyeSlashIcon />}
        </div>
      )}
      {unitOfMeasurementTag && (
        <span className="input-component__unity-measurement-tag">
          {unitOfMeasurementTag}
        </span>
      )}
    </div>
  );
}

/** Exports */
export default InputComponent;
