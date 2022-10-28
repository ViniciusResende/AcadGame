/** React imports */
import React from 'react';
import { useNavigate } from 'react-router-dom';

/** React components */
import Login from '../../components/Unauthenticated/Login';

/** Library */
import Lib from 'acad-game-lib';

function RouteLogin() {
  const navigator = useNavigate();

  async function loginAuth(username: string, password: string) {
    const loginAuthResponse = await Lib.auth.login(username, password);

    if (loginAuthResponse?.token) {
      navigator('/profile');
    } else {
      // TODO
    }
  }

  return <Login loginAuth={loginAuth} />;
}

/** Exports */
export default RouteLogin;
