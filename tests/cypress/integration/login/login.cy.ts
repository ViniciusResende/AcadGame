import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

after(() => {
  cy.logout();
});

// Filling form with wrong info

Given('Visit login page', () => {
  cy.visit('/login', { failOnStatusCode: false });
});

Then('Login inputs should be empty', () => {
  cy.get('.login-page__input').should('be.empty');
});

When('Fill wrongly input email', () => {
  cy.get('input[name="username"]').type('wrong@email.com');
});

Then('Email input should have correct value', () => {
  cy.get('input[name="username"]').should('have.value', 'wrong@email.com');
});

When('Fill wrongly input password', () => {
  cy.get('input[name="password"]').type('fakepassword');
});

Then('Password input should have correct value', () => {
  cy.get('input[name="password"]').should('have.value', 'fakepassword');
});

When(
  'Click on Password input eye icon input should change type to text',
  () => {
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
    cy.get('.input-component__visibility-toggle').click();
    cy.get('input[name="password"]').should('have.attr', 'type', 'text');
  },
);

Then('Button should NOT be disabled with filled inputs', () => {
  cy.get('.button-component').should('not.be.disabled');
});

When('Click on send button', () => {
  cy.on('uncaught:exception', (error) => {
    expect(error.name).to.include('ApiClientHttpError');
    return false;
  });

  cy.intercept({
    url: '**/api/auth/authenticate',
    method: 'POST',
  }).as('authErr');

  cy.get('.button-component').click();
});

Then('Error message should be visible', () => {
  cy.wait('@authErr');
  cy.wait(500);
  cy.get('.toast-component__default.fail').should('be.visible');
  cy.get('.toast-component__message').should(($toast) => {
    expect($toast.text()).to.equal(
      'Falha na autenticação, verifique suas credenciais e tente novamente.',
    );
  });
});

// Filling form with right info

When('Fill input with right values', () => {
  const email = Cypress.env('EMAIL');
  const password = Cypress.env('PASSWORD');

  cy.get('input[name="username"]').clear().type(email);
  cy.get('input[name="password"]').clear().type(password);
});

Then('Click on send Form', () => {
  cy.intercept({
    url: '**/api/auth/authenticate',
    method: 'POST',
  }).as('auth');

  cy.get('.button-component').click();
});

Then('should login with success', () => {
  cy.location('pathname').should('eq', '/');

  cy.wait(1000);
});

// Visit page without authetication

When('Visit profile page and is not logged', () => {
  cy.logout();

  cy.on('uncaught:exception', (error) => {
    expect(error.name).to.include('ApiClientHttpError');
    return false;
  });

  cy.visit('/profile');
});

Then('should redirect to login page', () => {
  cy.location().should((loc) => {
    expect(loc.pathname).to.contain('/login');
  });
});

When('Click on signUp anchor', () => {
  cy.get('.login-page__sign-up a').click();
});

Then('Should be redirected to signUp page', () => {
  cy.location().should((loc) => {
    expect(loc.pathname).to.contain('/signUp');
  });
});
