/** React imports */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/** React Component */
import Button from '../../Common/Button';
import Checkbox from '../../Common/Checkbox';
import Input from '../../Common/Input';
import UnauthenticatedPage from '../Page';

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

  function SignUpIllustration() {
    return (
      <div className="sign-up-page__illustration-container">
        <h1>Junte-se conosco e tenha prazer em evoluir.</h1>
        <h3>O primeiro passo para alcançar um objetivo é o começar</h3>
        <FitnessTracker />
      </div>
    );
  }

  function onSubmitForm(event: React.FormEvent) {
    event.preventDefault();
    //@ts-ignore
    const { nickname, email, password } = event.target;

    signUpAuth(nickname.value, email.value, password.value);
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
          />
          <Input
            className="sign-up-page__input"
            controlId="email"
            inputLabel="E-mail"
            name="email"
          />
          <Input
            className="sign-up-page__input"
            controlId="password"
            inputLabel="Senha"
            type="password"
            name="password"
          />
          <Input
            className="sign-up-page__input"
            controlId="password_check"
            inputLabel="Confirmar Senha"
            type="password"
            name="password_check"
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
            disabled={!hasAcceptedTerms}
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
