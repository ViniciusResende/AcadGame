/** React imports */
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

/** Styles */
import './UnauthenticatedLayout.scss';

function UnauthenticatedLayout() {
  return (
    <Suspense fallback="loading">
      <div className="unauthenticated-page">
        <Outlet />
      </div>
    </Suspense>
  );
}

/** Exports */
export default UnauthenticatedLayout;
