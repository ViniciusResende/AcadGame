import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'

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
  const [collapsePage, setCollapsePage] = useState(false);
  const [windowSize, setWindowSize] = useState(getWindowSize())
  
  // let handleWindowCollapse = () => {
  //   let {width, height} = useWindowDimensions();
  //   alert(width);
  // }
  
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
      console.log(windowSize)
      if (windowSize.innerWidth < 1050)
        setCollapsePage(true);
      else
        setCollapsePage(false);
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <header className="main-header__container">
      <Link className="main-header__logo" to="/">
        <Logo />
        <div>
          <h3>Acad Game</h3>
          <h4>Share - Persist - Compete</h4>
        </div>
      </Link>
      {!collapsePage && (
        <nav className="main-header__nav-bar">
          {menuNavigationAnchors.map((menuItem) => (
            <Link key={menuItem.path} to={menuItem.path}>
              {menuItem.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  console.log(`Aqui em getWindowSize: ${innerWidth} e ${innerHeight}`)
  return {innerWidth, innerHeight};
}

/** Exports */
export default HeaderComponent;
