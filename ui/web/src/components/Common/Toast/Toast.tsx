/** React imports */
import React, { useEffect, useState } from 'react';
import cx from 'classnames';

/** React Hooks */
import { useResize } from '../../../hooks';

/** Library */
import Lib from 'acad-game-lib';

/** Enums */
import {
  ToastEventTypesEnum,
  ToastConfigDurationEnum,
  ToastConfigMessagesEnum,
  ToastConfigTypesEnum,
} from '../../../data/enums/ToastEnums';

/** Types */
import { ToastCallPayload } from '../../../data/types/ToastTypes';

/** Styles */
import './Toast.scss';

/** Assets */
import { XMarkIcon, CheckIcon } from '../../../assets/svg/icons';

/** Constants */
const DEFAULT_TOAST_CONFIG: ToastCallPayload = {
  type: ToastConfigTypesEnum.FAIL,
  message: ToastConfigMessagesEnum.GENERIC_FAIL_MESSAGE,
  timeToClose: ToastConfigDurationEnum.MEDIUM,
};

type ToastComponentProps = {
  onDismiss?: () => void;
};

const ToastComponent = ({ onDismiss }: ToastComponentProps) => {
  const [toastConfig, setToastConfig] =
    useState<ToastCallPayload>(DEFAULT_TOAST_CONFIG);
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutToClose, setIsAboutToClose] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function updateToastConfigAndDispatch(
      newToastConfig: ToastCallPayload | undefined
    ) {
      newToastConfig
        ? setToastConfig(newToastConfig)
        : setToastConfig(DEFAULT_TOAST_CONFIG);
      setIsOpen(true);

      setUpToastAutoClosing();
    }

    Lib.utils.subscribe(
      ToastEventTypesEnum.NEW_TOAST_DISPATCH,
      updateToastConfigAndDispatch
    );

    return () =>
      Lib.utils.unsubscribe(
        ToastEventTypesEnum.NEW_TOAST_DISPATCH,
        updateToastConfigAndDispatch
      );
  }, []);

  function setUpToastAutoClosing() {
    setTimeout(() => setIsAboutToClose(true), toastConfig.timeToClose);

    setTimeout(handleEndTimer, toastConfig.timeToClose + 500);
  }

  function handleEndTimer() {
    setIsOpen(false);
    setIsAboutToClose(false);

    onDismiss && onDismiss();
  }

  function handleClose() {
    setIsAboutToClose(true);

    setTimeout(handleEndTimer, 500);
  }

  function onResize() {
    if (window.innerWidth < 850) setIsMobile(true);
    else setIsMobile(false);
  }
  useResize(onResize);

  const positionToastClass = cx('toast-component__container', {
    isAboutToClose: isAboutToClose,
    isMobilePositioning: isMobile,
    defaultPositioning: !isMobile,
  });

  const typeToastClass = cx('toast-component__default', {
    [toastConfig.type]: toastConfig.type,
  });

  return (
    <>
      {isOpen && (
        <div className={positionToastClass}>
          <div className={typeToastClass}>
            {toastConfig.type === 'success' ? (
              <CheckIcon className="toast-component__toast-icon" />
            ) : (
              <XMarkIcon
                className={cx('toast-component__toast-icon', {
                  [toastConfig.type]: toastConfig.type,
                })}
              />
            )}
            <span className="toast-component__message">
              {toastConfig.message}
            </span>
            <button
              className="toast-component__btn-close"
              onClick={handleClose}
            >
              <XMarkIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

/** Exports */
export default ToastComponent;
