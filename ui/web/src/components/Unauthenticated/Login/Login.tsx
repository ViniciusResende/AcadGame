/** React imports */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/** React Component */
import Button from '../../Common/Button';
import Input from '../../Common/Input';
import UnauthenticatedPage from '../Page';

/** Helpers */
import {
  dispatchFeedbackToast,
  emailValidation,
  requiredValidation,
} from '../../../helpers';

/** Enums */
import {
  ToastConfigDurationEnum,
  ToastConfigMessagesEnum,
  ToastConfigTypesEnum,
} from '../../../data/enums/ToastEnums';

/** Styles */
import './Login.scss';

/** Assets */
import { LogInIcon } from '../../../assets/svg/icons';
import { HealthyStyleIllustration } from '../../../assets/svg/illustrations';
import { LogoFull } from '../../../assets/svg/logo';

type LoginComponentProps = {
  loginAuth: (username: string, password: string) => Promise<void>;
};
function LoginComponent({ loginAuth }: LoginComponentProps) {
  const [thereIsInputErrors, setThereIsInputErrors] = useState(false);

  function LoginIllustration() {
    return (
      <div className="login-page__illustration-container">
        <h1>Uma conquista a cada passo.</h1>
        <h3>
          Conecte-se, evolua, compartilhe e torne sua jornada mais divertida com
          a gente
        </h3>
        <HealthyStyleIllustration />
      </div>
    );
  }

  function handleFormValidation(email: string, password: string): boolean {
    if (!email || !password) {
      dispatchFeedbackToast({
        type: ToastConfigTypesEnum.FAIL,
        message: ToastConfigMessagesEnum.LOGIN_FORM_NOT_FULFILLED,
        timeToClose: ToastConfigDurationEnum.MEDIUM,
      });

      return true;
    }

    return false;
  }

  function onSubmitForm(event: React.FormEvent) {
    event.preventDefault();
    //@ts-ignore
    let { username, password } = event.target;
    username = username.value;
    password = password.value;

    const thereIsFormErrors = handleFormValidation(username, password);

    if (!thereIsFormErrors) loginAuth(username.value, password.value);
  }

  function LoginContent() {
    return (
      <section className="login-page__form-container">
        <LogoFull className="login-page__logo" />
        <form onSubmit={onSubmitForm}>
          <Input
            className="login-page__input"
            controlId="email"
            inputLabel="E-mail"
            type="email"
            name="username"
            validatorFunctions={[requiredValidation, emailValidation]}
            onValidationError={() => setThereIsInputErrors(true)}
            onValidationSuccess={() => setThereIsInputErrors(false)}
          />
          <Input
            className="login-page__input"
            controlId="password"
            inputLabel="Senha"
            type="password"
            name="password"
            validatorFunctions={[requiredValidation]}
            onValidationError={() => setThereIsInputErrors(true)}
            onValidationSuccess={() => setThereIsInputErrors(false)}
          />
          <Button
            modifier="default"
            icon={<LogInIcon />}
            type="submit"
            disabled={thereIsInputErrors}
          >
            Entrar
          </Button>
        </form>
        <span className="login-page__sign-up">
          Não tem conta? <Link to={'/signUp'}>Cadastre-se no AcadGame</Link>
        </span>
      </section>
    );
  }

  return (
    <UnauthenticatedPage
      illustrationContent={LoginIllustration()}
      mainFormContent={LoginContent()}
    />
  );
}

/** Exports */
export default LoginComponent;
