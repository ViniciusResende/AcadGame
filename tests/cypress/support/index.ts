// Import commands.ts using ES2015 syntax:
import './commands';
import { IRequestAuthenticatedParams } from './interfaces';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to restore the JWT token from local storage.
       * @example cy.restoreTokenLocalStorage()
       */
      restoreTokenLocalStorage(): Chainable<Element>;

      /**
       * Custom command to authenticate and store token.
       * @example cy.login()
       */
      getToken(): Chainable<Element>;

      /**
       * Custom command to authenticate and store token.
       * @example cy.login()
       */
      login(): Chainable<Element>;

      /**
       * Custom command to logout and remove stored token.
       * @example cy.logout()
       */
      logout(): Chainable<Element>;

      /**
       * Custom command to make authenticated requests.
       * @example cy.requestAuthenticated({
       *  method: 'GET',
       *  url: '/api/auth/authenticate',
       *  body: {username: 'oi', password: 'to'},
       *  alias: 'login'
       * })
       */
      requestAuthenticated(
        params: IRequestAuthenticatedParams,
      ): Chainable<Element>;

      /**
       * Custom command to assert request calls count.
       * @example cy.requestsCount('login', 1)
       */
      requestsCount(alias: string, numOfCalls: number): Chainable<Element>;
    }
  }
}
