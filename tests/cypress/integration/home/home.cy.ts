import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

before(() => {
  cy.login();
});

after(() => {
  cy.logout();
});

// Visiting and interacting with Home page

Given('Visit home page', () => {
  cy.visit('/');
});

Then('Header with navigation should be displayed', () => {
  cy.get('.main-header__container').should('be.visible');
  cy.get('.main-header__nav-bar').should('be.visible');
});

Then('What is Acad Game section should be rendered', () => {
  cy.get('.home-page__head-title h1')
    .invoke('text')
    .should('equal', 'O que é o Acad Game?');
  cy.get('.home-page__head-items').should('be.visible');
});

Then('How does Acad Game impacts you slide should be visible', () => {
  cy.get('.slider-component__dotsBtn').first().click();
  cy.get('.home-page__slide-head h2')
    .first()
    .should('be.visible')
    .and('have.text', 'Como o Acad Game impacta você?');
});

Then('How does Acad Game works slide should be visible', () => {
  cy.get('.slider-component__dotsBtn').eq(1).click();
  cy.get('.home-page__slide-head h2')
    .eq(1)
    .should('be.visible')
    .and('have.text', 'Como o Acad Game funciona?');
});

Then('Who are us slide should be visible', () => {
  cy.get('.slider-component__dotsBtn').last().click();
  cy.get('.home-page__slide-head h2')
    .last()
    .should('be.visible')
    .and('have.text', 'Quem somos nós?');
});

When('Wait 10 seconds slide should change', () => {
  cy.get('.slider-component__dotsBtn')
    .eq(2)
    .should('have.attr', 'class', 'slider-component__dotsBtn isActive');
  cy.wait(10000);
  cy.get('.slider-component__dotsBtn')
    .eq(0)
    .should('have.attr', 'class', 'slider-component__dotsBtn isActive');
});

Then('Home footer section should be rendered', () => {
  cy.get('.home-page__footer').should('be.visible');
  cy.get('.home-page__footer-contact a')
    .should('have.attr', 'href', 'mailto:contact.acadgame@gmail.com')
    .and('have.text', 'contact.acadgame@gmail.com');
});
