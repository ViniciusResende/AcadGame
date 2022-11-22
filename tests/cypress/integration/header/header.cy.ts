import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

before(() => {
  cy.login();
});

after(() => {
  cy.logout();
});

const headerNavigationItems = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Ficha de Exercícios',
    path: '/exercisesSheets',
  },
  {
    name: 'Ranking',
    path: '/ranking',
  },
  {
    name: 'Perfil',
    path: '/profile',
  },
];

// Assuring proper working of Header

Then('Header should have Logo rendered', () => {
  cy.get('.main-header__logo-wrapper').should('be.visible');
  cy.get('.main-header__logo').should('have.attr', 'href', '/');
});

Then('Header navigators items should be properly rendered', () => {
  cy.get('.main-header__nav-bar a').each(($elem, idx) => {
    cy.wrap($elem).should('have.text', headerNavigationItems[idx].name);
    cy.wrap($elem).should('have.attr', 'href', headerNavigationItems[idx].path);
  });
});

When('Header navigators are used should navigate to right pages', () => {
  cy.get('.main-header__nav-bar a').each(($elem, idx) => {
    cy.wrap($elem).click();
    cy.wait(200);
    cy.location('pathname').should('eq', headerNavigationItems[idx].path);
  });
});
