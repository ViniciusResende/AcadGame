import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

before(() => {
  cy.login();
});

beforeEach(() => {
  cy.restoreTokenLocalStorage();
});

after(() => {
  cy.logout();
});

let userName: string;
let userPicture: string;

// Interact with user info

Given('Visit profile page', () => {
  cy.intercept({ url: '**/api/users/me', method: 'GET' }).as('userInfo');
  cy.intercept(
    {
      url: '**/api/dailyScores/user/last7days',
      method: 'GET',
    },
    {
      fixture: 'profile/last-7-days.json',
      statusCode: 200,
    },
  ).as('userMetrics');

  cy.visit('/profile');
});

Then('Personal info card should be correctly rendered', () => {
  cy.get('.profile-page__upper-cards .default-card-box__header h2')
    .first()
    .should('have.text', 'Informações pessoais');

  cy.requestAuthenticated({
    url: '/api/users/me',
    method: 'GET',
    alias: 'userInfoReq',
  }).then((res) => {
    //@ts-ignore
    const userInfoData = res.body.data;

    userName = userInfoData.nickname;
    userPicture = userInfoData.profileIcon;

    cy.get('.profile-page__user-name span').should(
      'have.text',
      userInfoData.nickname,
    );
    cy.get('.profile-page__user-points strong').should(
      'have.text',
      userInfoData.score,
    );
    cy.get('.profile-page__user-picture img').should(
      'have.attr',
      'data-cy',
      userInfoData.profileIcon,
    );
  });
});

Then('Badges card should be correctly rendered', () => {
  cy.get('.profile-page__upper-cards .default-card-box__header h2')
    .last()
    .should('have.text', 'Conquistas alcançadas');

  cy.get('.working-on-placeholder__container').should('be.visible');
});

Then('Weekly metrics card should be correctly rendered', () => {
  cy.get('.profile-page__bottom-card .default-card-box__header h2')
    .last()
    .should('have.text', 'Métricas da Semana');

  cy.get('.profile-page__user-metrics-illustration').should('be.visible');
  cy.get('.weekly-user-chart__container').should('be.visible');
});

// Edit user name

When('Click on edition name button', () => {
  cy.get('[data-cy="edit-name-button"]').click();
});

Then('Fullfil new name input', () => {
  cy.get('input[name="nickname"]').type('Bruno Diferente');
});

When('Click on cancel edition button', () => {
  cy.get('[data-cy="edit-name-cancel"]').click();
});

Then('Name should not be changed', () => {
  cy.get('.profile-page__user-name span').should('have.text', userName);
});

When('Click on confirm edition button and API fails', () => {
  cy.on('uncaught:exception', (error) => {
    expect(error.name).to.include('ApiClientHttpError');
    return false;
  });

  cy.intercept(
    {
      url: '**/api/users/me',
      method: 'PUT',
    },
    {
      statusCode: 400,
      fixture: 'general/default-error.json',
    },
  ).as('editionErr');

  cy.get('[data-cy="edit-name-confirm"]').click();
});

Then('A fail toast feedback should be visible after edition try', () => {
  cy.wait('@editionErr');
  cy.wait(500);
  cy.get('.toast-component__default.fail').should('be.visible');
  cy.get('.toast-component__message').should(($toast) => {
    expect($toast.text()).to.equal(
      'Suas informações de usuário não puderam ser atualizadas, por favor tente novamente.',
    );
  });

  cy.wait(5000);
});

When('Click on confirm edition button and API succeeds', () => {
  cy.intercept({
    url: '**/api/users/me',
    method: 'PUT',
  }).as('editionSuccess');

  cy.get('[data-cy="edit-name-confirm"]').click();
});

Then('A success toast feedback should be visible after edition', () => {
  cy.wait('@editionSuccess');
  cy.wait(500);
  cy.get('.toast-component__default.success').should('be.visible');
  cy.get('.toast-component__message').should(($toast) => {
    expect($toast.text()).to.equal(
      'Suas informações de usuário foram atualizadas com sucesso.',
    );
  });

  cy.wait(5000);
});

Then('Name should be changed', () => {
  cy.get('.profile-page__user-name span').should(
    'have.text',
    'Bruno Diferente',
  );
});

Given('Name edition succeeds, revert change', () => {
  cy.get('[data-cy="edit-name-button"]').click();
  cy.get('input[name="nickname"]').type(userName);
  cy.get('[data-cy="edit-name-confirm"]').click();

  cy.get('.profile-page__user-name span').should('have.text', userName);
});

// Edit user picture cancel

When('Click on edition picture button', () => {
  cy.get('[data-cy="edit-picture-button"]').click();
});

Then('Confirm picture edition button should be disabled', () => {
  cy.get('[data-cy="edit-picture-confirm"]').should('be.disabled');
});

Then('Select an arbitrary new user picture', () => {
  cy.get('.picture-modal__picture').eq(24).click();
});

Then('Confirm picture edition button should be enabled', () => {
  cy.get('[data-cy="edit-picture-confirm"]').should('not.be.disabled');
});

When('Click on cancel picture edition button', () => {
  cy.get('[data-cy="edit-picture-cancel"]').click();
});

Then('User picture should not be changed', () => {
  cy.get('.profile-page__user-picture img').should(
    'have.attr',
    'data-cy',
    userPicture,
  );
});

// Edit user picture fail

When('Click on confirm picture edition button and API fails', () => {
  cy.on('uncaught:exception', (error) => {
    expect(error.name).to.include('ApiClientHttpError');
    return false;
  });

  cy.intercept(
    {
      url: '**/api/users/me',
      method: 'PUT',
    },
    {
      statusCode: 400,
      fixture: 'general/default-error.json',
    },
  ).as('editionErr');

  cy.get('[data-cy="edit-picture-confirm"]').click();
});

// Edit user picture success

When('Click on confirm picture edition button', () => {
  cy.intercept({
    url: '**/api/users/me',
    method: 'PUT',
  }).as('editionSuccess');

  cy.get('[data-cy="edit-picture-confirm"]').click();
});

Then('User picture should be changed', () => {
  cy.get('.profile-page__user-picture img').should(
    'have.attr',
    'data-cy',
    'special_buzz',
  );
});

Given('User picture edition succeeds, revert change', () => {
  cy.get('[data-cy="edit-picture-button"]').click();
  cy.get('.picture-modal__picture').eq(30).click();
  cy.get('[data-cy="edit-picture-confirm"]').click();
  cy.get('.profile-page__user-picture img').should(
    'have.attr',
    'data-cy',
    userPicture,
  );
});
