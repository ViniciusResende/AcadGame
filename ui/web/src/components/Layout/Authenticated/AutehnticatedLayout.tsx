/** React imports */
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

/** React Component */
import Header from './elements/Header';
import Toast from '../../Common/Toast';

/** Styles */
import './AuthenticatedLayout.scss';

function AuthenticatedLayout() {
  return (
    <Suspense fallback="loading">
      <div className="authenticated-page">
        <Header />
        <div className="page-content">
          <Outlet />
          <Toast />
        </div>
      </div>
    </Suspense>
  );
}

/** Exports */
export default AuthenticatedLayout;
