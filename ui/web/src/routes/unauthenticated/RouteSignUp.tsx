/** React imports */
import React from 'react';

/** React components */
import SignUp from '../../components/Unauthenticated/SignUp';

/** Library */
import Lib from 'acad-game-lib';

function RouteSignUp() {
  async function signUpAuth(nickname: string, email: string, password: string) {
    const signUpAuthResponse = await Lib.auth.signUp(nickname, email, password);

    if (signUpAuthResponse?.token) {
      // TODO
    } else {
      // TODO
    }
  }

  return <SignUp signUpAuth={signUpAuth} />;
}

/** Exports */
export default RouteSignUp;
