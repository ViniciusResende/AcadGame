import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

beforeEach(() => {
  cy.restoreTokenLocalStorage();
});

after(() => {
  cy.logout();
});

Given('Preserve token', () => {
  cy.login();
  cy.getToken();
  cy.restoreTokenLocalStorage();
});

// SignUp should work properly

Then('Should logout to future app interaction', () => {
  cy.logout();
  cy.visit('/login');
});

// Login should work properly

// Home should work properly

// Header should work properly

// Profile should work properly

// Exercises Sheets should work properly

Given('Click on exercises sheet header option', () => {
  cy.get('.main-header__nav-bar a').eq(1).click();
});

// Ranking should work properly

Given('Click on ranking header option', () => {
  cy.intercept(
    {
      url: '**/api/dailyScores/weekPodium',
      method: 'GET',
    },
    {
      fixture: 'ranking/week-podium.json',
      statusCode: 200,
    },
  ).as('weekPodium');

  cy.get('.main-header__nav-bar a').eq(2).click();
});
