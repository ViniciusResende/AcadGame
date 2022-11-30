import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

after(() => {
  cy.logout();
});

// Filling form with invalid infos

Given('Visit signUp page', () => {
  cy.visit('/signUp', { failOnStatusCode: false });
});

Then('Inputs should be empty and submit button disabled', () => {
  cy.get('.sign-up-page__input').should('be.empty');
  cy.get('.button-component').should('be.disabled');
});

When('Fill input email with invalid data', () => {
  cy.get('input[name="email"]').type('invalidemail@banana');
});

Then('Should be displayed an invalid email error feedback', () => {
  cy.get('input[name="email"] ~ .errorSpan').should('be.visible');
  cy.get('input[name="email"] ~ .errorSpan').should(($span) => {
    expect($span.text()).to.equal('E-mail inválido');
  });
  cy.get('input[name="email"]').should(
    'have.css',
    'border-color',
    'rgb(239, 64, 53)',
  );

  cy.get('input[name="email"]').clear();
  cy.get('input[name="email"]').type('validemail@banana.com');
});

When('Fill input password with invalid data', () => {
  cy.get('input[name="password"]').type('carlos123');
});

Then('Should be displayed an invalid password error feedback', () => {
  cy.get('input[name="password"] ~ .errorSpan').should('be.visible');
  cy.get('input[name="password"] ~ .errorSpan').should(($span) => {
    expect($span.text()).to.equal(
      'Senha deve conter ao menos 1 caractere maiúsculo',
    );
  });
  cy.get('input[name="password"]').should(
    'have.css',
    'border-color',
    'rgb(239, 64, 53)',
  );

  cy.get('input[name="password"]').clear();
  cy.get('input[name="password"]').type('SenhaValida123');
});

When('Fill input password config with divergent password', () => {
  cy.get('input[name="password_check"]').type('SenhaDiferente123');
});

Given('Click on passwords inputs eye icons', () => {
  cy.get('input[name="password"]').should('have.attr', 'type', 'password');
  cy.get('.input-component__visibility-toggle').first().click();
  cy.get('input[name="password_check"]').should(
    'have.attr',
    'type',
    'password',
  );
  cy.get('.input-component__visibility-toggle').last().click();
});

Then('Input types should change to text', () => {
  cy.get('input[name="password"]').should('have.attr', 'type', 'text');
  cy.get('input[name="password_check"]').should('have.attr', 'type', 'text');
});

When('Check terms and conditions warning', () => {
  cy.get('.checkbox-container__checkmark').click();
});

Then('Button should NOT be disabled with checked consent', () => {
  cy.get('.button-component').should('not.be.disabled');
});

When('Click on send button signUp', () => {
  cy.get('.button-component').click();
});

Then('All inputs should be filled message should be visible', () => {
  cy.get('.toast-component__default.fail').should('be.visible');
  cy.get('.toast-component__message').should(($toast) => {
    expect($toast.text()).to.equal(
      'Todos os campos do formulário de cadastro devem ser preenchidos.',
    );
  });
  cy.wait(5000);
});

Given('Fullfil nickname input', () => {
  cy.get('input[name="nickname"]').type('Bruno Diferente');
});

Then('Divergent passwords error message should be visible', () => {
  cy.get('.toast-component__default.fail').should('be.visible');
  cy.get('.toast-component__message').should(($toast) => {
    expect($toast.text()).to.equal(
      'As senhas não conferem, por favor verifique os valores informados.',
    );
  });

  cy.get('.errorSpan').should('be.visible');
  cy.get('.errorSpan')
    .last()
    .should(($span) => {
      expect($span.text()).to.equal('As senhas não coincidem');
    });

  cy.wait(5000);
});

// Filling form with right info

When('Fill input with right values signUp', () => {
  cy.get('input[name="nickname"]').clear();
  cy.get('input[name="email"]').clear();
  cy.get('input[name="password"]').clear();
  cy.get('input[name="password_check"]').clear();

  cy.get('input[name="nickname"]').type('Bruno Diferente');
  cy.get('input[name="email"]').type('brunodiferente.contato@gmail.com');
  cy.get('input[name="password"]').type('Bruno123');
  cy.get('input[name="password_check"]').type('Bruno123');
});

Given('Click on send Form with API fail', () => {
  cy.intercept(
    {
      url: '**/api/auth/register',
      method: 'POST',
    },
    {
      fixture: 'general/default-error.json',
      statusCode: 400,
    },
  ).as('signUpFail');

  cy.on('uncaught:exception', (error) => {
    expect(error.name).to.include('ApiClientHttpError');
    return false;
  });

  cy.get('.button-component').click();
});

Then('Fail to create account error message should be visible', () => {
  cy.wait('@signUpFail');

  cy.get('.toast-component__default.fail').should('be.visible');
  cy.get('.toast-component__message').should(($toast) => {
    expect($toast.text()).to.equal(
      'Infelizmente não conseguimos concluir seu cadastro, tente novamente em alguns instantes',
    );
  });

  cy.wait(5000);
});

Given('Click on send Form with API success', () => {
  cy.login();
  cy.getToken().then((token) => {
    cy.intercept(
      {
        url: '**/api/auth/register',
        method: 'POST',
      },
      {
        body: {
          data: {
            message: 'Enjoy your Token!',
            //@ts-ignore
            token: token.value,
          },
        },
        statusCode: 201,
      },
    ).as('signUpSuccess');
  });

  cy.get('.button-component').click();
});

Then('Should signUp with success', () => {
  cy.wait('@signUpSuccess');

  cy.location('pathname').should('eq', '/');

  cy.wait(1000);
});

// Visit page without authentication

Given('Visit sign up and already have an account', () => {
  cy.visit('/signUp', { failOnStatusCode: false });
});

When('Click on login anchor', () => {
  cy.get('.sign-up-page__login a').click();
});

Then('Should be redirected to login page', () => {
  cy.location().should((loc) => {
    expect(loc.pathname).to.contain('/login');
  });
});
