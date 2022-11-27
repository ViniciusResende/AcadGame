jest.mock('../../../infrastructure/db');

const DAILY_SCORE_DOMAIN = require('../../../domains/dayScore/dayScoreDomain');
const USER_DOMAIN = require('../../../domains/user/userDomain');

const DAILY_SCORE = require('../../../infrastructure/models/dayScore');
const USER = require('../../../infrastructure/models/user');

describe('User updation', () => {

    const USER_INFO = {
        nickname: "testUser",
        email: "test@test.com.test",
        password: "test123"
    };

    const EXERCISE_INFO = {
        numRepetitions: 10,
        numSets: 100,
        isLoad: true
    };

    beforeAll(async () => {
        await USER_DOMAIN.createUser(USER_INFO);
    });

    test('Should update user\'s today score (POST /api/dailyScores/user/add)', async () => {
        await DAILY_SCORE_DOMAIN.createDailyScore(1, [EXERCISE_INFO]);

        const CURR_SCORE = await DAILY_SCORE_DOMAIN.getUserDayScores(1);
        expect(CURR_SCORE[0].score).toBe(1000);
    });
    
    test('Should update the user\'s daily score multiple times (POST /api/dailyScores/user/add)', async () => {
        await DAILY_SCORE_DOMAIN.createDailyScore(1, [EXERCISE_INFO]);
    
        const FIRST_SCORE = await DAILY_SCORE_DOMAIN.getUserDayScores(1);
        expect(FIRST_SCORE[0].score).toBe(1000);


        await DAILY_SCORE_DOMAIN.createDailyScore(1, [EXERCISE_INFO, EXERCISE_INFO]);
    
        const SECOND_SCORE = await DAILY_SCORE_DOMAIN.getUserDayScores(1);
        expect(SECOND_SCORE[1].score + SECOND_SCORE[2].score).toBe(3000);
    });

    afterAll(async () => {
        await USER.sync({
            force: true
        });

        await DAILY_SCORE.sync({
            force: true
        });
   });
});