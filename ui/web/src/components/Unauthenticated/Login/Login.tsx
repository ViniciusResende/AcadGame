/** React imports */
import React from 'react';
import { Link } from 'react-router-dom';

/** React Component */
import Button from '../../Common/Button';
import Input from '../../Common/Input';
import UnauthenticatedPage from '../Page';

/** Styles */
import './Login.scss';

/** Assets */
import { LogInIcon } from '../../../assets/svg/icons';
import { HealthyStyleIllustration } from '../../../assets/svg/illustrations';
import { LogoFull } from '../../../assets/svg/logo';

function LoginIllustration() {
  return (
    <div className="login-page__illustration-container">
      <h1>Uma conquista a cada passo.</h1>
      <h3>
        Conecte-se, evolua, compartilhe e torne sua jornada mais divertida com a
        gente
      </h3>
      <HealthyStyleIllustration />
    </div>
  );
}

function LoginContent() {
  return (
    <section className="login-page__form-container">
      <LogoFull className="login-page__logo" />
      <Input
        className="login-page__input"
        controlId="login"
        inputLabel="Login"
      />
      <Input
        className="login-page__input"
        controlId="password"
        inputLabel="Senha"
        type="password"
      />
      <Button modifier="default" icon={<LogInIcon />}>
        Entrar
      </Button>
      <span className="login-page__sign-up">
        Não tem conta? <Link to={'/signUp'}>Cadastre-se no AcadGame</Link>
      </span>
    </section>
  );
}

function LoginComponent() {
  return (
    <UnauthenticatedPage
      illustrationContent={LoginIllustration()}
      mainFormContent={LoginContent()}
    />
  );
}

/** Exports */
export default LoginComponent;
