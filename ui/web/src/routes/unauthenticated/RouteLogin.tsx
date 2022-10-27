/** React imports */
import React from 'react';

/** React components */
import Login from '../../components/Unauthenticated/Login';

/** Library */
import Lib from 'acad-game-lib';

function RouteLogin() {
  async function loginAuth(username: string, password: string) {
    const loginAuthResponse = await Lib.auth.login(username, password);

    if (loginAuthResponse?.token) {
      // TODO
    } else {
      // TODO
    }
  }

  return <Login loginAuth={loginAuth} />;
}

/** Exports */
export default RouteLogin;
