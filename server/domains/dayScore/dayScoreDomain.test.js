const dayScoreDomain = require('./dayScoreDomain');
const queryDayScore = require('../../gates/dayScore/dayScoreExitGate');
const userDomain = require('../../domains/user/userDomain');

jest.mock('../../gates/dayScore/dayScoreExitGate', () => {
    return {
        getUserDayScores: jest.fn(),
        getDaysScoresInInterval: jest.fn(),
        postDailyScore: jest.fn(),
        getWeekPodium: jest.fn()
    };
});

jest.mock('../../domains/user/userDomain', () => {
    return {
        getSingleUser: jest.fn(),
        updateUserInfo: jest.fn()
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

        jest.spyOn(queryDayScore, 'getUserDayScores').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const userId = 1;

        const userDailyScores = await dayScoreDomain.getUserDayScores(userId);

        expect(queryDayScore.getUserDayScores).toHaveBeenCalledTimes(1);
        expect(queryDayScore.getUserDayScores).toHaveBeenCalledWith(userId);
        expect(userDailyScores).toEqual(mockResponse);

        jest.clearAllMocks();
    });
});

describe('Get the user last seven daily scores', () => {
    it('Should be able to find the last seven daily scores of an user', async () => {
        const mockResponse = {
            data: [
                {
                    date: '2022-11-18',
                    score: 0
                },
                {
                    date: '2022-11-19',
                    score: 0
                },
                {
                    date: '2022-11-20',
                    score: 0
                },
                {
                    date: '2022-11-21',
                    score: 0
                },
                {
                    date: '2022-11-22',
                    score: 0
                },
                {
                    date: '2022-11-23',
                    score: 0
                },
                {
                    date: '2022-11-24',
                    score: 0
                },
                {
                    date: '2022-11-25',
                    score: 0
                }
            ]
        };

        jest.spyOn(
            queryDayScore,
            'getDaysScoresInInterval'
        ).mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const userId = 1;

        const last7DailyScores = await dayScoreDomain.getLast7DaysScores(
            userId
        );

        expect(queryDayScore.getDaysScoresInInterval).toHaveBeenCalledTimes(1);
        expect(queryDayScore.getDaysScoresInInterval).toHaveBeenCalledWith(
            userId,
            expect.any(Date),
            expect.any(Date)
        );
        expect(last7DailyScores).toEqual(mockResponse);

        jest.clearAllMocks();
    });
});

describe('Create a daily score', () => {
    it('Should be able to create a new daily score to a specific user', async () => {
        jest.spyOn(queryDayScore, 'postDailyScore').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve())
        );

        const userMockResponse = {
            dataValues: {
                id: 1,
                nickname: 'Test Name',
                profileIcon: 'special_spike',
                email: 'test@gmail.com',
                score: 7987
            }
        };

        jest.spyOn(userDomain, 'getSingleUser').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(userMockResponse))
        );

        jest.spyOn(userDomain, 'updateUserInfo').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve())
        );

        const userId = 1;
        const sentExercisesInfo = [
            {
                load: 20,
                time: null,
                numRepetitions: 10,
                numSets: 4,
                isLoad: true
            },
            {
                load: 20,
                time: null,
                numRepetitions: 10,
                numSets: 3,
                isLoad: true
            },
            {
                load: 4,
                time: null,
                numRepetitions: 12,
                numSets: 3,
                isLoad: true
            }
        ];

        await dayScoreDomain.createDailyScore(userId, sentExercisesInfo);

        const score = 40 + 30 + 36;
        const totalScore = userMockResponse.dataValues.score + score;

        expect(queryDayScore.postDailyScore).toHaveBeenCalledTimes(1);
        expect(queryDayScore.postDailyScore).toHaveBeenCalledWith(
            userId,
            expect.any(Date),
            score
        );

        expect(userDomain.getSingleUser).toHaveBeenCalledTimes(1);
        expect(userDomain.getSingleUser).toHaveBeenCalledWith(userId);

        expect(userDomain.updateUserInfo).toHaveBeenCalledTimes(1);
        expect(userDomain.updateUserInfo).toHaveBeenCalledWith(userId, {
            score: totalScore
        });

        jest.clearAllMocks();
    });
});

describe('Get weekly podium', () => {
    it('Should be able to get users weekly score sorted', async () => {
        const mockResponse = [
            {
                userId: 1,
                score: 696,
                nickname: 'Test Name 1',
                profileIcon: 'special_spike'
            },
            {
                userId: 2,
                score: 1006,
                nickname: 'Test Name 2',
                profileIcon: 'default'
            },
            {
                userId: 3,
                score: 61,
                nickname: 'Test Name 3',
                profileIcon: 'default'
            }
        ];

        jest.spyOn(queryDayScore, 'getWeekPodium').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const expectedResponse = [
            {
                userId: 2,
                score: 1006,
                nickname: 'Test Name 2',
                profileIcon: 'default'
            },
            {
                userId: 1,
                score: 696,
                nickname: 'Test Name 1',
                profileIcon: 'special_spike'
            },
            {
                userId: 3,
                score: 61,
                nickname: 'Test Name 3',
                profileIcon: 'default'
            }
        ];

        const weekPodium = await dayScoreDomain.getWeekPodium();

        expect(queryDayScore.getWeekPodium).toHaveBeenCalledTimes(1);
        expect(queryDayScore.getWeekPodium).toHaveBeenCalledWith(
            expect.any(Number),
            expect.any(Number)
        );
        expect(weekPodium).toEqual(expectedResponse);

        jest.clearAllMocks();
    });
});

describe('Get user weekly rank', () => {
    it('Should be able to get the user weekly rank', async () => {
        const mockResponse = [
            {
                userId: 1,
                score: 696,
                nickname: 'Test Name 1',
                profileIcon: 'special_spike'
            },
            {
                userId: 2,
                score: 1007,
                nickname: 'Test Name 2',
                profileIcon: 'default'
            },
            {
                userId: 3,
                score: 61,
                nickname: 'Test Name 3',
                profileIcon: 'default'
            }
        ];

        jest.spyOn(queryDayScore, 'getWeekPodium').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const expectedResponse = {
            first: {
                userId: 2,
                score: 1007,
                nickname: 'Test Name 2',
                profileIcon: 'default',
                userRank: 1
            },
            averageScore: 588,
            user: {
                userId: 1,
                score: 696,
                nickname: 'Test Name 1',
                profileIcon: 'special_spike',
                userRank: 2
            }
        };

        const userId = 1;

        const userWeeklyRank = await dayScoreDomain.getUserWeeklyRank(userId);

        expect(queryDayScore.getWeekPodium).toHaveBeenCalledTimes(1);
        expect(queryDayScore.getWeekPodium).toHaveBeenCalledWith(
            expect.any(Number),
            expect.any(Number)
        );

        jest.clearAllMocks();
    });
});
