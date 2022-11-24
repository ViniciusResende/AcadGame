import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import mockWeekPodiumJson from '../../fixtures/ranking/week-podium.json';

const mockWeekPodium = mockWeekPodiumJson.data;

export interface IUserRankingInfo {
  firstPlaceRankUser: {
    userId: string;
    score: number;
    nickname: string;
    profileIcon: string;
  };
  averageScore: number;
  userRankInfo: {
    userId: string;
    score: number;
    nickname: string;
    profileIcon: string;
    userRank: number;
  };
}

let userRankingInfo: IUserRankingInfo;

function fetchUserRanking() {
  cy.requestAuthenticated({
    url: '/api/dailyScores/user/ranking',
    method: 'GET',
    alias: 'userRankingReq',
  }).then((res) => {
    //@ts-ignore
    const resData = res.body.data;

    userRankingInfo = {
      firstPlaceRankUser: resData.first,
      averageScore: resData.averageScore,
      userRankInfo: resData.user,
    } as IUserRankingInfo;
  });

  cy.wait(200);

  cy.intercept({
    url: '**/api/dailyScores/user/ranking',
    method: 'GET',
  }).as('userRanking');
}

before(() => {
  cy.login();

  fetchUserRanking();
});

beforeEach(() => {
  cy.restoreTokenLocalStorage();
});

after(() => {
  cy.logout();
});

// Interact with podium card

Given('Visit ranking page', () => {
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

  cy.visit('/ranking');
});

Then('Weekly podium card should be rendered', () => {
  cy.wait('@weekPodium');

  cy.get('.ranking-page__upper-cards .default-card-box__header h2')
    .first()
    .should('have.text', 'Podium da Semana');

  cy.get('.week-podium-chart__container').should('be.visible');
});

Then('First place podium should be rendered correctly', () => {
  const FIRST_PLACE_USER_LIST_IDX = 0;

  cy.get('.podium-user__container')
    .eq(FIRST_PLACE_USER_LIST_IDX)
    .as('podiumFirst');
  cy.get('@podiumFirst')
    .find('.podium-user__picture')
    .should(
      'have.attr',
      'data-cy',
      mockWeekPodium[FIRST_PLACE_USER_LIST_IDX].profileIcon,
    );
  cy.get('@podiumFirst')
    .find('.podium-user__name')
    .should('have.text', mockWeekPodium[FIRST_PLACE_USER_LIST_IDX].nickname);
  cy.get('@podiumFirst')
    .find('.podium-user__points')
    .should(
      'have.text',
      `${mockWeekPodium[FIRST_PLACE_USER_LIST_IDX].score} pontos`,
    );
  cy.get('@podiumFirst')
    .find('.podium-user__trophy g path')
    .should('have.css', 'fill', 'rgb(255, 188, 17)');
});

Then('Second place podium should be rendered correctly', () => {
  const SECOND_PLACE_USER_LIST_IDX = 1;

  cy.get('.podium-user__container')
    .eq(SECOND_PLACE_USER_LIST_IDX)
    .as('podiumSecond');
  cy.get('@podiumSecond')
    .find('.podium-user__picture')
    .should(
      'have.attr',
      'data-cy',
      mockWeekPodium[SECOND_PLACE_USER_LIST_IDX].profileIcon,
    );
  cy.get('@podiumSecond')
    .find('.podium-user__name')
    .should('have.text', mockWeekPodium[SECOND_PLACE_USER_LIST_IDX].nickname);
  cy.get('@podiumSecond')
    .find('.podium-user__points')
    .should(
      'have.text',
      `${mockWeekPodium[SECOND_PLACE_USER_LIST_IDX].score} pontos`,
    );
  cy.get('@podiumSecond')
    .find('.podium-user__trophy g path')
    .should('have.css', 'fill', 'rgb(212, 211, 210)');
});

Then('Third place podium should be rendered correctly', () => {
  const THIRD_PLACE_USER_LIST_IDX = 2;

  cy.get('.podium-user__container')
    .eq(THIRD_PLACE_USER_LIST_IDX)
    .as('podiumThird');
  cy.get('@podiumThird')
    .find('.podium-user__picture')
    .should(
      'have.attr',
      'data-cy',
      mockWeekPodium[THIRD_PLACE_USER_LIST_IDX].profileIcon,
    );
  cy.get('@podiumThird')
    .find('.podium-user__name')
    .should('have.text', mockWeekPodium[THIRD_PLACE_USER_LIST_IDX].nickname);
  cy.get('@podiumThird')
    .find('.podium-user__points')
    .should(
      'have.text',
      `${mockWeekPodium[THIRD_PLACE_USER_LIST_IDX].score} pontos`,
    );
  cy.get('@podiumThird')
    .find('.podium-user__trophy g path')
    .should('have.css', 'fill', 'rgb(212, 125, 75)');
});

Then('Fourth place podium should be rendered correctly', () => {
  const FOURTH_PLACE_USER_LIST_IDX = 3;

  cy.get('.podium-user__container')
    .eq(FOURTH_PLACE_USER_LIST_IDX)
    .as('podiumFourth');
  cy.get('@podiumFourth')
    .find('.podium-user__picture')
    .should(
      'have.attr',
      'data-cy',
      mockWeekPodium[FOURTH_PLACE_USER_LIST_IDX].profileIcon,
    );
  cy.get('@podiumFourth')
    .find('.podium-user__name')
    .should('have.text', mockWeekPodium[FOURTH_PLACE_USER_LIST_IDX].nickname);
  cy.get('@podiumFourth')
    .find('.podium-user__points')
    .should(
      'have.text',
      `${mockWeekPodium[FOURTH_PLACE_USER_LIST_IDX].score} pontos`,
    );
  cy.get('@podiumFourth')
    .find('.podium-user__trophy')
    .should('have.css', 'display', 'none');
});

// Interact with self ranking card

Then('Self ranking card should be rendered', () => {
  cy.get('.ranking-page__upper-cards .default-card-box__header h2')
    .last()
    .should('have.text', 'Seu Ranking');

  cy.get('.profile-user-chart__container').should('be.visible');
});

Then('User personal information should be visible', () => {
  cy.get('.profile-user__picture').should(
    'have.attr',
    'data-cy',
    userRankingInfo.userRankInfo.profileIcon,
  );
  cy.get('.profile-user__info')
    .first()
    .should('have.text', userRankingInfo.userRankInfo.nickname);
});

Then('User score and position should be visible', () => {
  cy.get('.profile-user__info')
    .eq(1)
    .find('strong')
    .should('have.text', userRankingInfo.userRankInfo.score);
  cy.get('.profile-user__info')
    .eq(2)
    .find('strong')
    .should('have.text', `${userRankingInfo.userRankInfo.userRank}°`);
});

// Interact with week ranking card

Then('Week ranking card should be rendered', () => {
  cy.get('.ranking-page__down-cards .default-card-box__header h2')
    .last()
    .should('have.text', 'Ranking da Semana');

  cy.get('.ranking-page__week-rank-card').should('be.visible');
});

Then('First card should start with the fifth positioned User', () => {
  const FIFTH_PLACE_USER_LIST_IDX = 4;

  cy.get('.week-rank-card__container')
    .first()
    .find('.week-rank-card__user-container')
    .first()
    .as('firstWeekRankUser');

  cy.get('@firstWeekRankUser')
    .find('.week-rank-card__user-picture')
    .should(
      'have.attr',
      'data-cy',
      mockWeekPodium[FIFTH_PLACE_USER_LIST_IDX].profileIcon,
    );
  cy.get('@firstWeekRankUser')
    .find('.week-rank-card__name')
    .should('have.text', mockWeekPodium[FIFTH_PLACE_USER_LIST_IDX].nickname);

  cy.get('@firstWeekRankUser')
    .find('.week-rank-card__metrics strong')
    .last()
    .should('have.text', '5°');
});

Then('Each card should have right five users, last not included', () => {
  const PODIUM_USERS_AMOUNT = 4;
  const USERS_PER_CARD = 5;
  const numberOfRankWeekCards = Math.ceil(
    (mockWeekPodium.length - PODIUM_USERS_AMOUNT) / USERS_PER_CARD,
  );

  for (let i = 0; i < numberOfRankWeekCards - 1; i++) {
    cy.get('.week-rank-card__container').eq(i).as('currentCard');

    cy.get('@currentCard')
      .find('.week-rank-card__body .week-rank-card__user-container')
      .should('have.length', 5);

    const cardStartPosition = USERS_PER_CARD * i + PODIUM_USERS_AMOUNT + 1;
    const cardEndPosition = cardStartPosition + USERS_PER_CARD - 1;

    cy.get('@currentCard')
      .find('.week-rank-card__header')
      .should('have.text', `${cardStartPosition}° a ${cardEndPosition}°`);

    cy.get('@currentCard')
      .find('.week-rank-card__name')
      .first()
      .should('have.text', mockWeekPodium[cardStartPosition - 1].nickname);

    cy.get('@currentCard')
      .find('.week-rank-card__name')
      .last()
      .should('have.text', mockWeekPodium[cardEndPosition - 1].nickname);
  }
});

When('Navigate to second week ranking slide', () => {
  cy.get('.slider-component__dotsBtn').last().click();
});

Then('Last card should complete remaining users', () => {
  const PODIUM_USERS_AMOUNT = 4;
  const USERS_PER_CARD = 5;
  const numberOfRankWeekCards = Math.ceil(
    (mockWeekPodium.length - PODIUM_USERS_AMOUNT) / USERS_PER_CARD,
  );
  const lastCardRemainUsers =
    mockWeekPodium.length - numberOfRankWeekCards * USERS_PER_CARD + 1;

  cy.get('.week-rank-card__container').last().as('lastCard');

  cy.get('@lastCard')
    .find('.week-rank-card__body .week-rank-card__user-container')
    .should('have.length', lastCardRemainUsers);

  const lastCardStartPosition = mockWeekPodium.length - lastCardRemainUsers + 1;

  cy.get('@lastCard')
    .find('.week-rank-card__header')
    .should(
      'have.text',
      `${lastCardStartPosition}° a ${
        lastCardStartPosition + USERS_PER_CARD - 1
      }°`,
    );

  cy.get('@lastCard')
    .find('.week-rank-card__name')
    .first()
    .should(
      'have.text',
      mockWeekPodium[mockWeekPodium.length - lastCardRemainUsers].nickname,
    );

  cy.get('@lastCard')
    .find('.week-rank-card__name')
    .last()
    .should('have.text', mockWeekPodium[mockWeekPodium.length - 1].nickname);
});

Then('Last user in the last card should be the worsted positioned user', () => {
  cy.get('.week-rank-card__container')
    .last()
    .find('.week-rank-card__body .week-rank-card__user-container')
    .last()
    .find('.week-rank-card__name')
    .should('have.text', mockWeekPodium[mockWeekPodium.length - 1].nickname);
});

When('Navigate to first week ranking slide', () => {
  cy.get('.slider-component__dotsBtn').first().click();
});

// Helper

Given('Get updated user ranking info', () => {
  fetchUserRanking();
});
