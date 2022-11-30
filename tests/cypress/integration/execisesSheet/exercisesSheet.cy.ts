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

// Interact with sheets slider

Given('Visit exercises sheet page', () => {
  cy.visit('/exercisesSheets');
});

Then('First exercises sheet should be visible', () => {
  cy.get('.exercises-sheet__header h3')
    .first()
    .should('be.visible')
    .and('have.text', 'Sua Ficha - 1');
});

When('Navigate on slider, should see all sheets', () => {
  for (let i = 1; i < 5; i++) {
    cy.get('.slider-component__arrowRight').click();
    cy.get('.exercises-sheet__header h3')
      .eq(i)
      .should('be.visible')
      .and('have.text', `Sua Ficha - ${i + 1}`);
  }
});

// Edit existing exercise

Given('Navigate to first exercises sheet', () => {
  cy.get('.slider-component__dotsBtn').eq(0).click();
});

When('Click on first exercise edit button', () => {
  cy.get('[data-cy="exercise-edit-button"]').first().click();
});

Then('Should open exercise edition modal with input default values', () => {
  cy.get('.exercise-update__form').should('be.visible');
  cy.get('input[name="numSets"]').should('have.value', '4');
  cy.get('input[name="numRepetitions"]').should('have.value', '14');
  cy.get('input[name="load"]').should('have.value', '8');
});

When('Edit inputs metrics to new values', () => {
  cy.get('input[name="numSets"]').clear();
  cy.get('input[name="numSets"]').type('3');
  cy.get('input[name="numRepetitions"]').clear();
  cy.get('input[name="numRepetitions"]').type('12');
  cy.get('input[name="load"]').clear();
  cy.get('input[name="load"]').type('10');
});

When('Click on exercise edition confirm button', () => {
  cy.intercept({
    url: '**/api/exercisesSheet/*/update/*',
    method: 'PUT',
  }).as('exerciseUpdateSuccess');

  cy.get('.exercise-update__submit-btn').click();
});

Then('A exercise edition success feedback toast should be visible', () => {
  cy.wait('@exerciseUpdateSuccess');

  cy.get('.toast-component__default.success').should('be.visible');
  cy.get('.toast-component__message').should(($toast) => {
    expect($toast.text()).to.equal(
      'O exercício teve seus valores editados com sucesso.',
    );
  });

  cy.wait(5000);
});

Then('The exercise data should be changed', () => {
  cy.get('.exercise-card__container').first().as('firstExerciseCard');
  cy.get('@firstExerciseCard')
    .get('.exercise-card__metric-value')
    .eq(0)
    .should('have.text', '3');
  cy.get('@firstExerciseCard')
    .get('.exercise-card__metric-value')
    .eq(1)
    .should('have.text', '12');
  cy.get('@firstExerciseCard')
    .get('.exercise-card__metric-value')
    .eq(2)
    .should('have.text', '10');
});

Given('Exercise edition succeeds, retrieve original data', () => {
  cy.get('[data-cy="exercise-edit-button"]').first().click();

  cy.get('input[name="numSets"]').clear();
  cy.get('input[name="numSets"]').type('4');
  cy.get('input[name="numRepetitions"]').clear();
  cy.get('input[name="numRepetitions"]').type('14');
  cy.get('input[name="load"]').clear();
  cy.get('input[name="load"]').type('8');

  cy.get('.exercise-update__submit-btn').click();

  cy.get('.exercise-card__container').first().as('firstExerciseCard');
  cy.get('@firstExerciseCard')
    .get('.exercise-card__metric-value')
    .eq(0)
    .should('have.text', '4');
  cy.get('@firstExerciseCard')
    .get('.exercise-card__metric-value')
    .eq(1)
    .should('have.text', '14');
  cy.get('@firstExerciseCard')
    .get('.exercise-card__metric-value')
    .eq(2)
    .should('have.text', '8');

  cy.wait(4000);
});

// Edit existing exercise fails

When('Click on exercise edition confirm button and API fails', () => {
  cy.on('uncaught:exception', (error) => {
    expect(error.name).to.include('ApiClientHttpError');
    return false;
  });

  cy.intercept(
    {
      url: '**/api/exercisesSheet/*/update/*',
      method: 'PUT',
    },
    {
      statusCode: 400,
      fixture: 'general/default-error.json',
    },
  ).as('exerciseUpdateErr');

  cy.get('.exercise-update__submit-btn').click();
});

Then('A exercise edition fail feedback toast should be visible', () => {
  cy.wait('@exerciseUpdateErr');

  cy.get('.toast-component__default.fail').should('be.visible');
  cy.get('.toast-component__message').should(($toast) => {
    expect($toast.text()).to.equal(
      'O exercício não pode ser atualizado, por favor tente novamente.',
    );
  });

  cy.wait(5000);
});

Then('The exercise data should not be changed', () => {
  cy.get('.exercise-card__container').first().as('firstExerciseCard');
  cy.get('@firstExerciseCard')
    .get('.exercise-card__metric-value')
    .eq(0)
    .should('have.text', '4');
  cy.get('@firstExerciseCard')
    .get('.exercise-card__metric-value')
    .eq(1)
    .should('have.text', '14');
  cy.get('@firstExerciseCard')
    .get('.exercise-card__metric-value')
    .eq(2)
    .should('have.text', '8');
});

// Add new exercise to sheet

Given('Navigate to last exercise sheet', () => {
  cy.get('.slider-component__dotsBtn').last().click();
});

When('Click on add new exercise button', () => {
  cy.get('.exercises-sheet__add-card').last().click();
});

Then('Should be redirected to add exercise page', () => {
  cy.location('pathname').should('eq', '/exercisesSheets/5/add');

  cy.wait(200);
});

let addedExerciseName: string;

Then('Select first listed exercise', async () => {
  cy.get('.exercises-add-card__container').first().as('firstAvailableToAdd');

  addedExerciseName = await new Cypress.Promise<string>((resolve) => {
    cy.get('@firstAvailableToAdd')
      .invoke('text')
      .then((txt) => resolve(txt.toString()));
  });

  cy.get('@firstAvailableToAdd').click();

  cy.get('@firstAvailableToAdd').should('have.class', 'active');
});

When('Click on add exercise button', () => {
  cy.intercept({
    url: '**/api/exercisesSheet/add/*',
    method: 'POST',
  }).as('exerciseAddSuccess');

  cy.get('.exercises-add-page__submit-button').click();
});

Then('Should be redirected do exercises sheet page', () => {
  cy.location('pathname').should('eq', '/exercisesSheets');

  cy.wait(200);
});

Then('A exercise add success feedback toast should be visible', () => {
  cy.wait('@exerciseAddSuccess');

  cy.get('.toast-component__default.success').should('be.visible');
  cy.get('.toast-component__message').should(($toast) => {
    expect($toast.text()).to.equal(
      'Os exercícios selecionados foram adicionados à sua ficha de exercícios.',
    );
  });

  cy.wait(4000);
});

Then('The new exercise should be shown and with empty values', () => {
  cy.contains(addedExerciseName, { timeout: 200 })
    .last()
    .parent('header')
    .parent('div')
    .as('newlyAddedExercise');

  cy.get('@newlyAddedExercise')
    .find('.exercise-card__metric-value')
    .eq(0)
    .should('have.text', '0');
  cy.get('@newlyAddedExercise')
    .find('.exercise-card__metric-value')
    .eq(1)
    .should('have.text', '0');

  cy.get('@newlyAddedExercise')
    .find('.exercise-card__metric-value')
    .then(($elem) => {
      if ($elem[2]) cy.wrap($elem[2]).should('have.text', '0');
    });
});

// Add new exercise to sheet fails

When('Click on add exercise button and API fails', () => {
  cy.on('uncaught:exception', (error) => {
    expect(error.name).to.include('ApiClientHttpError');
    return false;
  });

  cy.intercept(
    {
      url: '**/api/exercisesSheet/add/*',
      method: 'POST',
    },
    {
      statusCode: 400,
      fixture: 'general/default-error.json',
    },
  ).as('exerciseAddErr');

  cy.get('.exercises-add-page__submit-button').click();
});

Then('A exercise add fail feedback toast should be visible', () => {
  cy.wait('@exerciseAddErr');

  cy.get('.toast-component__default.fail').should('be.visible');
  cy.get('.toast-component__message').should(($toast) => {
    expect($toast.text()).to.equal(
      'Os exercícios selecionados não puderam ser adicionados, por favor tente novamente.',
    );
  });

  cy.wait(3000);
});

// Submit exercises sheet exercises succeeds

let pastSubmitUserPoints: number;

Then('Select six eight first exercises from sheet', () => {
  for (let i = 0; i < 6; i++) cy.get('.exercise-card__container').eq(i).click();

  cy.wait(100);

  for (let i = 0; i < 6; i++)
    cy.get('.exercise-card__container').eq(i).should('have.class', 'active');
});

When('Submit exercises sheet', () => {
  cy.intercept({
    url: '**/api/dailyScores/user/add/',
    method: 'POST',
  }).as('sheetSubmitSuccess');

  cy.requestAuthenticated({
    url: '/api/users/me',
    method: 'GET',
    alias: 'userInfoReq',
  }).then((res) => {
    //@ts-ignore
    pastSubmitUserPoints = res.body.data.score;
  });

  cy.get('[data-cy="submit-sheet-button"]').click();
});

Then('The initial selected exercises should not be selected any more', () => {
  for (let i = 0; i < 6; i++)
    cy.get('.exercise-card__container')
      .eq(i)
      .should('not.have.class', 'active');
});

Then(
  'A exercises sheet submit success feedback toast should be visible',
  () => {
    cy.wait('@sheetSubmitSuccess');

    cy.get('.toast-component__default.success').should('be.visible');
    cy.get('.toast-component__message').should(($toast) => {
      expect($toast.text()).to.equal(
        'Os exercícios selecionados foram submetidos com sucesso e seus pontos já serão contabilizados.',
      );
    });

    cy.wait(4000);
  },
);

Then('Total points should be increased by new submission', () => {
  const SHEET_SUBMISSION_POINTS_GAP = 291;

  cy.get('.profile-page__user-points strong').should(
    'have.text',
    `${pastSubmitUserPoints + SHEET_SUBMISSION_POINTS_GAP}`,
  );
});

// Submit exercises sheet fails

When('Submit exercises sheet and API fails', () => {
  cy.on('uncaught:exception', (error) => {
    expect(error.name).to.include('ApiClientHttpError');
    return false;
  });

  cy.intercept(
    {
      url: '**/api/dailyScores/user/add/',
      method: 'POST',
    },
    {
      statusCode: 400,
      fixture: 'general/default-error.json',
    },
  ).as('sheetSubmitErr');

  cy.requestAuthenticated({
    url: '/api/users/me',
    method: 'GET',
    alias: 'userInfoReq',
  }).then((res) => {
    //@ts-ignore
    pastSubmitUserPoints = res.body.data.score;
  });

  cy.get('[data-cy="submit-sheet-button"]').click();
});

Then('A exercises sheet submit fail feedback toast should be visible', () => {
  cy.wait('@sheetSubmitErr');

  cy.get('.toast-component__default.fail').should('be.visible');
  cy.get('.toast-component__message').should(($toast) => {
    expect($toast.text()).to.equal(
      'Os exercícios selecionados não puderam ser submetidos, por favor tente novamente.',
    );
  });

  cy.wait(4000);
});

Then('Total points should not be increased by new submission', () => {
  cy.get('.profile-page__user-points strong').should(
    'have.text',
    pastSubmitUserPoints,
  );
});
