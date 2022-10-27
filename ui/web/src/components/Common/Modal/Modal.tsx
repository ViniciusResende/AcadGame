/** React imports */
import React from 'react';
import cx from 'classnames';

/** Styles */
import './Modal.scss';

/** Assets */
import { XMarkIcon } from '../../../assets/svg/icons';

/** Component properties interface */
interface ModalComponentProps {
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
  handleOnClose: () => void;
}

function ModalComponent(props: ModalComponentProps) {
  const { children, title, isOpen, handleOnClose } = props;

  return (
    <>
      <div
        className={cx('modal-component__overlay', { isOpen: isOpen })}
        onClick={handleOnClose}
      />
      <div className={cx('modal-component__wrapper', { isOpen: isOpen })}>
        <button
          className="modal-component__close-button"
          onClick={handleOnClose}
        >
          <XMarkIcon />
        </button>
        <header className="modal-component__modal-header">
          <h3>{title}</h3>
        </header>
        <main className="modal-component__modal-content">{children}</main>
      </div>
    </>
  );
}

/** Exports */
export default ModalComponent;
