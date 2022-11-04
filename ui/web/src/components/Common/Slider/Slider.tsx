/** React imports */
import React, { Children, useCallback, useEffect, useState } from 'react';
import cx from 'classnames';

/** React Hooks */
import { useInterval } from '../../../hooks';

/** Helpers */
import { getUniqueId } from '../../../helpers';

/** Styles */
import './Slider.scss';

/** Assets */
import { ChevronIcon } from '../../../assets/svg/icons';

type SliderProps = {
  children: React.ReactNode;
  className?: string;
  autoplay?: boolean;
  delay?: number;
  slidesToShow?: number;
  slideClassName?: string;
};

export const SliderComponent = ({
  children,
  className,
  autoplay = true,
  delay = 2500,
  slidesToShow = 1,
  slideClassName,
  ...rest
}: SliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lastCommand, setLastCommand] = useState<'next' | 'prev'>('next');
  const [delayState, setDelayState] = useState<number | null>(
    autoplay ? delay : null
  );

  function handleSetDelayState(delay: number | null) {
    if (autoplay) setDelayState(delay);
  }

  useEffect(() => {
    if (!delayState) handleSetDelayState(delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide]);

  useInterval(() => {
    nextSlide();
  }, delayState);

  const goToSlide = useCallback((value: number) => {
    handleSetDelayState(null);
    setCurrentSlide(value);
  }, []);

  function nextSlide(clear?: boolean) {
    const childrenLen = Children.count(children) / slidesToShow;

    clear && handleSetDelayState(null);

    if (currentSlide + 1 < childrenLen) {
      setCurrentSlide((prev) => prev + 1);
      setLastCommand('next');
    } else {
      setCurrentSlide(0);
      setLastCommand('next');
    }
  }

  function previousSlide() {
    const childrenLen = Children.count(children) / slidesToShow;

    handleSetDelayState(null);

    if (currentSlide !== 0) {
      setCurrentSlide((prev) => prev - 1);
      setLastCommand('prev');
    } else {
      setCurrentSlide(childrenLen - 1);
      setLastCommand('prev');
    }
  }

  function divideChildContent(children: React.ReactNode) {
    const arrayChildren = Children.toArray(children);

    if (!Array.isArray(arrayChildren)) {
      return (
        <div className={cx('slider-component__slide', slideClassName)}>
          {children}
        </div>
      );
    } else {
      return Children.map(arrayChildren, (_, index) => {
        const indexCorrected = index + 1;

        if (indexCorrected % slidesToShow === 0) {
          return (
            <div className={cx('slider-component__slide', slideClassName)}>
              {arrayChildren.slice(
                indexCorrected - slidesToShow,
                indexCorrected
              )}
            </div>
          );
        }
      });
    }
  }

  function renderChildren(current: number) {
    const dividedChildren = divideChildContent(children);

    if (!Array.isArray(dividedChildren)) {
      return React.cloneElement(dividedChildren, {
        className: cx(
          'slider-component__currentSlide',
          lastCommand,
          dividedChildren.props.className
        ),
      });
    } else {
      return Children.map(dividedChildren, (child, index) => {
        const isCurrent = cx({
          'slider-component__currentSlide': current === index,
        });
        return React.cloneElement(child, {
          className: cx(isCurrent, lastCommand, child.props.className),
        });
      });
    }
  }

  function renderArrows() {
    return (
      <div className="slider-component__arrows">
        <button
          className="slider-component__arrowLeft slider-component__arrow"
          onClick={() => previousSlide()}
        >
          <ChevronIcon />
        </button>

        <button
          className="slider-component__arrowRight slider-component__arrow"
          onClick={() => nextSlide(true)}
        >
          <ChevronIcon />
        </button>
      </div>
    );
  }

  function renderDots(children: React.ReactNode) {
    const dividedChildren = divideChildContent(children);
    const thereIsMoreThanOneSlide = Array.isArray(dividedChildren);

    return (
      <ul className="slider-component__dots">
        {thereIsMoreThanOneSlide &&
          dividedChildren.map((_, index) => (
            <li
              className={cx('slider-component__dotsBtn', {
                isActive: currentSlide === index,
              })}
              onClick={() => goToSlide(index)}
              key={getUniqueId()}
            >
              {index + 1}
            </li>
          ))}
      </ul>
    );
  }

  return (
    <div
      className={cx('slider-component__container', className, 'withArrow')}
      {...rest}
    >
      <div className="slider-component__wrapper">
        {renderChildren(currentSlide)}
      </div>

      {Children.count(children) > 1 && renderDots(children)}
      {Children.count(children) > 1 && renderArrows()}
    </div>
  );
};

/** Exports */
export default SliderComponent;
