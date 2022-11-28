const tokenKey = 'acad_game@_user_gym';

let loginToken: string;

Cypress.Commands.add('restoreTokenLocalStorage', () => {
  Cypress.Cookies.preserveOnce(tokenKey);
  cy.getCookie(tokenKey).then((cookie) => {
    cookie && localStorage.setItem(tokenKey, cookie.value);
  });
});

Cypress.Commands.add('getToken', () => {
  Cypress.Cookies.preserveOnce(tokenKey);
  cy.getCookie(tokenKey);
});

Cypress.Commands.add('login', () => {
  cy.request({
    url: `${Cypress.env('API_URL')}/api/auth/authenticate`,
    method: 'POST',
    body: {
      email: Cypress.env('EMAIL'),
      password: Cypress.env('PASSWORD'),
    },
  })
    .its('body')
    .then((resp) => {
      loginToken = resp.data.token;

      cy.setCookie(tokenKey, loginToken);
      localStorage.setItem(tokenKey, loginToken);
      cy.restoreTokenLocalStorage();

      Cypress.Cookies.defaults({
        preserve: tokenKey,
      });
    });
});

Cypress.Commands.add('logout', () => {
  cy.clearCookie(tokenKey);
  localStorage.removeItem(tokenKey);
});

Cypress.Commands.add('requestAuthenticated', ({ method, url, body, alias }) => {
  cy.getCookie(tokenKey).then((cookie) => {
    cy.request({
      method,
      url: `${Cypress.env('API_URL')}${url}`,
      headers: {
        Authorization: `Bearer ${cookie?.value}`,
      },
      body,
    }).as(alias);
  });
});

Cypress.Commands.add('requestsCount', (alias, numOfCalls = 0) => {
  cy.get(`@${alias}.all`).then((interceptions) => {
    expect(interceptions).to.have.length(numOfCalls);
  });
});
