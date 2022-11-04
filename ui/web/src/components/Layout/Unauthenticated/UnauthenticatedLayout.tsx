/** React imports */
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

/** React components */
import Toast from '../../Common/Toast';

/** Styles */
import './UnauthenticatedLayout.scss';

function UnauthenticatedLayout() {
  return (
    <Suspense fallback="loading">
      <div className="unauthenticated-page">
        <Outlet />
        <Toast />
      </div>
    </Suspense>
  );
}

/** Exports */
export default UnauthenticatedLayout;
