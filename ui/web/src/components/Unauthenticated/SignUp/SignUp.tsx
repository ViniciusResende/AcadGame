/** React imports */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/** React Component */
import Button from '../../Common/Button';
import Checkbox from '../../Common/Checkbox';
import Input from '../../Common/Input';
import UnauthenticatedPage from '../Page';

/** Helpers */
import {
  emailValidation,
  passwordValidation,
  passwordMatchValidation,
  requiredValidation,
} from '../../../helpers';

/** Helpers */
import { dispatchFeedbackToast } from '../../../helpers';

/** Enums */
import {
  ToastConfigDurationEnum,
  ToastConfigMessagesEnum,
  ToastConfigTypesEnum,
} from '../../../data/enums/ToastEnums';

/** Styles */
import './SignUp.scss';

/** Assets */
import { LogInIcon } from '../../../assets/svg/icons';
import { FitnessTracker } from '../../../assets/svg/illustrations';
import { LogoFull } from '../../../assets/svg/logo';

type SignUpComponentProps = {
  signUpAuth: (
    nickname: string,
    email: string,
    password: string
  ) => Promise<void>;
};
function SignUpComponent({ signUpAuth }: SignUpComponentProps) {
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [thereIsInputErrors, setThereIsInputErrors] = useState(false);
  const [doesPasswordsMatchError, setDoesPasswordsMatch] = useState<
    string | undefined
  >(undefined);

  function SignUpIllustration() {
    return (
      <div className="sign-up-page__illustration-container">
        <h1>Junte-se conosco e tenha prazer em evoluir.</h1>
        <h3>O primeiro passo para alcançar um objetivo é o começar</h3>
        <FitnessTracker />
      </div>
    );
  }

  function handleFormValidation(
    nickname: string,
    email: string,
    password: string,
    passwordCheck: string
  ): boolean {
    if (!nickname || !email || !password || !password) {
      dispatchFeedbackToast({
        type: ToastConfigTypesEnum.FAIL,
        message: ToastConfigMessagesEnum.SIGN_UP_FORM_NOT_FULFILLED,
        timeToClose: ToastConfigDurationEnum.MEDIUM,
      });

      return true;
    }

    const errorPasswordMatch = passwordMatchValidation(password, passwordCheck);
    if (!errorPasswordMatch) return false;

    setDoesPasswordsMatch(errorPasswordMatch);
    dispatchFeedbackToast({
      type: ToastConfigTypesEnum.FAIL,
      message: ToastConfigMessagesEnum.PASSWORD_DO_NOT_MATCH_FAIL_MESSAGE,
      timeToClose: ToastConfigDurationEnum.MEDIUM,
    });

    return true;
  }

  function onSubmitForm(event: React.FormEvent) {
    event.preventDefault();
    //@ts-ignore
    let { nickname, email, password, password_check } = event.target;
    nickname = nickname.value;
    email = email.value;
    password = password.value;
    password_check = password_check.value;

    const thereIsFormErrors = handleFormValidation(
      nickname,
      email,
      password,
      password_check
    );

    if (!thereIsFormErrors) signUpAuth(nickname, email, password);
  }

  function LoginContent() {
    return (
      <section className="sign-up-page__form-container">
        <LogoFull className="sign-up-page__logo" />
        <form onSubmit={onSubmitForm}>
          <Input
            className="sign-up-page__input"
            controlId="nickname"
            inputLabel="Apelido"
            name="nickname"
            validatorFunctions={[requiredValidation, emailValidation]}
            onValidationError={() => setThereIsInputErrors(true)}
            onValidationSuccess={() => setThereIsInputErrors(false)}
          />
          <Input
            className="sign-up-page__input"
            controlId="email"
            inputLabel="E-mail"
            name="email"
            validatorFunctions={[requiredValidation, emailValidation]}
            onValidationError={() => setThereIsInputErrors(true)}
            onValidationSuccess={() => setThereIsInputErrors(false)}
          />
          <Input
            className="sign-up-page__input"
            controlId="password"
            inputLabel="Senha"
            type="password"
            name="password"
            validatorFunctions={[requiredValidation, passwordValidation]}
            customErrorMessage={doesPasswordsMatchError}
            onValidationError={() => setThereIsInputErrors(true)}
            onValidationSuccess={() => setThereIsInputErrors(false)}
          />
          <Input
            className="sign-up-page__input"
            controlId="password_check"
            inputLabel="Confirmar Senha"
            type="password"
            name="password_check"
            validatorFunctions={[requiredValidation]}
            customErrorMessage={doesPasswordsMatchError}
            onValidationError={() => setThereIsInputErrors(true)}
            onValidationSuccess={() => setThereIsInputErrors(false)}
          />
          <div className="sign-up-page__accept-terms">
            <Checkbox onClick={() => setHasAcceptedTerms((prev) => !prev)} />
            <span>
              Ao marcar concordo com os <a href="/">Termos de Uso</a> e com a{' '}
              <a href="a">Política de Uso de Dados</a>.
            </span>
          </div>
          <Button
            modifier="default"
            icon={<LogInIcon />}
            type="submit"
            disabled={!hasAcceptedTerms || thereIsInputErrors}
          >
            Entrar
          </Button>
        </form>
        <span className="sign-up-page__login">
          Já tem conta? <Link to={'/login'}>Faça seu LogIn</Link>
        </span>
      </section>
    );
  }

  return (
    <UnauthenticatedPage
      illustrationContent={SignUpIllustration()}
      mainFormContent={LoginContent()}
    />
  );
}

/** Exports */
export default SignUpComponent;
