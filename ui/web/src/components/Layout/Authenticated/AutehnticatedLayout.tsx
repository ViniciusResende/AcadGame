/** React imports */
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

/** React Component */
import Header from './elements/Header';
/** Styles */
import './AuthenticatedLayout.scss';

function AuthenticatedLayout() {
  return (
    <Suspense fallback="loading">
      <div className="authenticated-page">
        <Header />
        <Outlet />
      </div>
    </Suspense>
  );
}

/** Exports */
export default AuthenticatedLayout;
