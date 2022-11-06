/** React imports */
import React from 'react';

/** React components */
import Home from '../../components/Authenticated/Home';

/** React Hooks */
import useSecurity from '../middlewares/useSecurity';

function RouteHome() {
  useSecurity();

  return <Home />;
}

/** Exports */
export default RouteHome;
