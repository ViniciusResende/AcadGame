/** React imports */
import React from 'react';
import { Link } from 'react-router-dom';

/** Styles */
import './Header.scss';

/** Assets */
import { Logo } from '../../../../../assets/svg/logo';

function HeaderComponent() {
  const menuNavigationAnchors = [
    { path: '/', name: 'Home' },
    { path: '/gymSheet', name: 'Ficha de Exercícios' },
    { path: '/friends', name: 'Meus Amigos' },
    { path: '/profile', name: 'Perfil' },
  ];
  return (
    <header className="main-header__container">
      <Link className="main-header__logo" to="/">
        <Logo />
        <div>
          <h3>Acad Game</h3>
          <h4>Share - Persist - Compete</h4>
        </div>
      </Link>
      <nav className="main-header__nav-bar">
        {menuNavigationAnchors.map((menuItem) => (
          <Link to={menuItem.path}>{menuItem.name}</Link>
        ))}
      </nav>
    </header>
  );
}

/** Exports */
export default HeaderComponent;
