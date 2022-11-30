const dayScoreExitGate = require('./dayScoreExitGate');
const dayScoreDBAdapter = require('../../adapters/dayScore/dayScoreDBAdapter');
const userDBAdapter = require('../../adapters/user/userDBAdapter');
const ServerError = require('../../utils/serverErrors');

jest.mock('../../adapters/dayScore/dayScoreDBAdapter', () => {
    return {
        findUserDayScores: jest.fn(),
        findUserDayScoresInInterval: jest.fn(),
        newDailyScore: jest.fn(),
        findAllDailyScores: jest.fn()
    };
});

jest.mock('../../adapters/user/userDBAdapter', () => {
    return {
        getEveryUser: jest.fn()
    };
});

describe('Get user daily scores', () => {
    it('Should be able to find all the user daily scores', async () => {
        const mockResponse = [
            {
                dataValues: {
                    userId: 1,
                    date: '2022-11-03T16:45:11.000Z',
                    week: 44,
                    year: 2022,
                    score: 361
                }
            },
            {
                dataValues: {
                    userId: 1,
                    date: '2022-11-04T16:45:22.000Z',
                    week: 44,
                    year: 2022,
                    score: 214
                }
            }
        ];

        jest.spyOn(
            dayScoreDBAdapter,
            'findUserDayScores'
        ).mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const userId = 1;

        const userDailyScores = await dayScoreExitGate.getUserDayScores(userId);

        expect(dayScoreDBAdapter.findUserDayScores).toHaveBeenCalledTimes(1);
        expect(dayScoreDBAdapter.findUserDayScores).toHaveBeenCalledWith(
            userId
        );
        expect(userDailyScores).toEqual(mockResponse);

        jest.clearAllMocks();
    });
});

describe('Get the user daily scores in a specific date interval', () => {
    it('Should be able to find the daily scores of an user in a specific date interval', async () => {
        const mockResponse = [
            {
                dataValues: {
                    id: 155,
                    userId: 1,
                    date: new Date('2022-11-25T03:00:00.000Z'),
                    score: 295
                }
            },
            {
                dataValues: {
                    id: 1,
                    userId: 1,
                    date: new Date('2022-11-27T03:00:00.000Z'),
                    score: 291
                }
            },

            {
                dataValues: {
                    id: 150,
                    userId: 1,
                    date: new Date('2022-11-27T03:00:00.000Z'),
                    score: 192
                }
            },
            {
                dataValues: {
                    id: 149,
                    userId: 1,
                    date: new Date('2022-11-27T03:00:00.000Z'),
                    score: 215
                }
            }
        ];

        jest.spyOn(
            dayScoreDBAdapter,
            'findUserDayScoresInInterval'
        ).mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const expectedResponse = [
            { date: '2022-11-21', score: 0 },
            { date: '2022-11-22', score: 0 },
            { date: '2022-11-23', score: 0 },
            { date: '2022-11-24', score: 295 },
            { date: '2022-11-25', score: 0 },
            { date: '2022-11-26', score: 0 },
            { date: '2022-11-27', score: 698 },
            { date: '2022-11-28', score: 0 }
        ];

        const userId = 1;
        const startDate = new Date('2022-11-22T03:00:00.000Z');
        const endDate = new Date('2022-11-29T03:00:00.000Z');

        const userDailyScores = await dayScoreExitGate.getDaysScoresInInterval(
            userId,
            startDate,
            endDate
        );

        expect(
            dayScoreDBAdapter.findUserDayScoresInInterval
        ).toHaveBeenCalledTimes(1);
        expect(
            dayScoreDBAdapter.findUserDayScoresInInterval
        ).toHaveBeenCalledWith(userId, startDate, endDate);
        expect(userDailyScores).toEqual(expectedResponse);

        jest.clearAllMocks();
    });
});

describe('Post a daily score', () => {
    it('Should be able to post a new daily score to a specific user', async () => {
        jest.spyOn(dayScoreDBAdapter, 'newDailyScore').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve())
        );

        const userId = 1;
        const date = new Date('2022-11-27T16:32:16.000Z');
        const score = 295;

        const expectedRequest = {
            userId: userId,
            date: date,
            score: score
        };

        await dayScoreExitGate.postDailyScore(userId, date, score);

        expect(dayScoreDBAdapter.newDailyScore).toHaveBeenCalledTimes(1);
        expect(dayScoreDBAdapter.newDailyScore).toHaveBeenCalledWith(
            expectedRequest
        );

        jest.clearAllMocks();
    });
});

describe('Get weekly podium', () => {
    it('Should be able to get users weekly score', async () => {
        const dailyScoresMockResponse = [
            {
                dataValues: {
                    userId: 17,
                    date: '2022-11-27T17:50:53.000Z',
                    week: 48,
                    year: 2022,
                    score: 356
                }
            },
            {
                dataValues: {
                    userId: 17,
                    date: '2022-11-27T17:50:53.000Z',
                    week: 48,
                    year: 2022,
                    score: 50
                }
            },
            {
                dataValues: {
                    userId: 16,
                    date: '2022-11-27T17:50:53.000Z',
                    week: 48,
                    year: 2022,
                    score: 451
                }
            },
            {
                dataValues: {
                    userId: 7,
                    date: '2022-11-28T17:17:07.000Z',
                    week: 48,
                    year: 2022,
                    score: 895
                }
            }
        ];

        jest.spyOn(
            dayScoreDBAdapter,
            'findAllDailyScores'
        ).mockImplementationOnce(
            (_userInfo) =>
                new Promise((resolve) => resolve(dailyScoresMockResponse))
        );

        const usersMockResponse = [
            {
                dataValues: {
                    id: 17,
                    nickname: 'Test Name 2',
                    profileIcon: 'default',
                    email: 'test2@gmail.com',
                    score: 10006
                },
                id: 17,
                nickname: 'Test Name 2',
                profileIcon: 'default',
                email: 'test2@gmail.com',
                score: 10006
            },
            {
                dataValues: {
                    id: 16,
                    nickname: 'Test Name 1',
                    profileIcon: 'default',
                    email: 'test1@gmail.com',
                    score: 7000
                },
                id: 16,
                nickname: 'Test Name 1',
                profileIcon: 'default',
                email: 'test1@gmail.com',
                score: 7000
            },
            {
                dataValues: {
                    id: 7,
                    nickname: 'Test Name',
                    profileIcon: 'default',
                    email: 'test@gmail.com',
                    score: 9000
                },
                id: 7,
                nickname: 'Test Name',
                profileIcon: 'default',
                email: 'test@gmail.com',
                score: 9000
            }
        ];

        jest.spyOn(userDBAdapter, 'getEveryUser').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(usersMockResponse))
        );

        const expectedResponse = [
            {
                userId: 7,
                score: 895,
                nickname: 'Test Name',
                profileIcon: 'default'
            },
            {
                userId: 16,
                score: 451,
                nickname: 'Test Name 1',
                profileIcon: 'default'
            },
            {
                userId: 17,
                score: 406,
                nickname: 'Test Name 2',
                profileIcon: 'default'
            }
        ];

        const week = 48;
        const year = 2022;

        const weekPodium = await dayScoreExitGate.getWeekPodium(year, week);

        expect(dayScoreDBAdapter.findAllDailyScores).toHaveBeenCalledTimes(1);
        expect(weekPodium).toEqual(expectedResponse);

        jest.clearAllMocks();
    });
});
