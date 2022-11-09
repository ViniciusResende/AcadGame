/** React imports */
import React from 'react';
import { useNavigate } from 'react-router-dom';

/** React components */
import SignUp from '../../components/Unauthenticated/SignUp';

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

function RouteSignUp() {
  const navigator = useNavigate();

  async function signUpAuth(nickname: string, email: string, password: string) {
    const signUpAuthResponse = await Lib.auth.signUp(nickname, email, password);

    if (signUpAuthResponse?.token) {
      navigator('/');
    } else {
      dispatchFeedbackToast({
        type: ToastConfigTypesEnum.FAIL,
        message: ToastConfigMessagesEnum.SIGN_UP_GENERIC_FAIL,
        timeToClose: ToastConfigDurationEnum.MEDIUM,
      });
    }
  }

  return <SignUp signUpAuth={signUpAuth} />;
}

/** Exports */
export default RouteSignUp;
