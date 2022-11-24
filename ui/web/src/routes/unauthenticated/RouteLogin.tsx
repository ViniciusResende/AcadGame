/** React imports */
import React from 'react';
import { useNavigate } from 'react-router-dom';

/** React components */
import Login from '../../components/Unauthenticated/Login';

/** Library */
import Lib from 'acad-game-lib';

/** Helpers */
import { dispatchFeedbackToast } from '../../helpers';

/** Enums */
import {
  ToastConfigDurationEnum,
  ToastConfigMessagesEnum,
  ToastConfigTypesEnum,
} from '../../data/enums/ToastEnums';

function RouteLogin() {
  const navigator = useNavigate();

  async function loginAuth(username: string, password: string) {
    const loginAuthResponse = await Lib.auth.login(username, password);

    if (loginAuthResponse?.token) {
      navigator('/');
    } else {
      dispatchFeedbackToast({
        type: ToastConfigTypesEnum.FAIL,
        message: ToastConfigMessagesEnum.LOGIN_GENERIC_FAIL,
        timeToClose: ToastConfigDurationEnum.MEDIUM,
      });
    }
  }

  return <Login loginAuth={loginAuth} />;
}

/** Exports */
export default RouteLogin;
