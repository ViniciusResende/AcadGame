/** React imports */
import React from 'react';
import { Link } from 'react-router-dom';

/** React Component */
import Button from '../../Common/Button';
import Input from '../../Common/Input';
import UnauthenticatedPage from '../Page';

/** Utils */
import {emailValidation} from "../utils"

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

  function onSubmitForm(event: React.FormEvent) {
    event.preventDefault();
    //@ts-ignore
    const { username, password } = event.target;

    loginAuth(username.value, password.value);
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
            validatorFunction={emailValidation}
          />
          <Input
            className="login-page__input"
            controlId="password"
            inputLabel="Senha"
            type="password"
            name="password"
          />
          <Button modifier="default" icon={<LogInIcon />} type="submit">
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
