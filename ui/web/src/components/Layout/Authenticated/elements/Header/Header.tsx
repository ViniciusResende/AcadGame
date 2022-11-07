/** React imports */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

/** Styles */
import './Header.scss';

/** Assets */
import { BarsIcon } from '../../../../../assets/svg/icons';
import { Logo } from '../../../../../assets/svg/logo';

/** Constants */
import MenuItems from './menuItems.json';

function HeaderComponent() {
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(true);

  return (
    <header className="main-header__container">
      <div className="main-header__content">
        <div className="main-header__logo-wrapper">
          <Link className="main-header__logo" to="/">
            <Logo />
            <div>
              <h3>Acad Game</h3>
              <h4>Share - Persist - Compete</h4>
            </div>
          </Link>
          <button
            className="main-header__open-btn"
            onClick={() => setIsHeaderCollapsed((prev) => !prev)}
          >
            <BarsIcon />
          </button>
        </div>
        <nav
          className={cx('main-header__nav-bar', {
            collapsed: isHeaderCollapsed,
          })}
        >
          {MenuItems.items.map((menuItem) => (
            <Link
              key={menuItem.path}
              to={menuItem.path}
              onClick={() => setIsHeaderCollapsed(true)}
            >
              {menuItem.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

/** Exports */
export default HeaderComponent;
