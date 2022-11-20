export interface IRequestAuthenticatedParams {
  method: Cypress.HttpMethod;
  url: string;
  body?: Cypress.RequestBody;
  alias: string;
}
