const exerciseSheetExitGate = require('./exerciseSheetExitGate');
const exerciseSheetDBAdapter = require('../../adapters/exerciseSheet/exerciseSheetDBAdapter');
const ServerError = require('../../utils/serverErrors');

jest.mock('../../adapters/exerciseSheet/exerciseSheetDBAdapter', () => {
    return {
        findUserExerciseSheets: jest.fn(),
        findOneExercise: jest.fn(),
        findAvailableExercisesSheet: jest.fn(),
        newUserExercises: jest.fn(),
        updateUserExercise: jest.fn(),
        eraseUserExercise: jest.fn()
    };
});

describe('Find user exercises sheets', () => {
    it('Should be able to get the user exercise sheets', async () => {
        const userExercisesMockResponse = [
            {
                dataValues: {
                    id: 5,
                    sheetId: 1,
                    userId: 1,
                    exerciseId: 115,
                    load: 25,
                    time: null,
                    numRepetitions: 15,
                    numSets: 4,
                    isLoad: true,
                    name: 'Triceps Corda'
                }
            }
        ];

        jest.spyOn(
            exerciseSheetDBAdapter,
            'findUserExerciseSheets'
        ).mockImplementationOnce(
            (_userInfo) =>
                new Promise((resolve) => resolve(userExercisesMockResponse))
        );

        const exerciseMockResponse = {
            dataValues: {
                id: 9,
                name: 'Triceps',
                type: 'triceps',
                isLoad: true
            }
        };

        jest.spyOn(
            exerciseSheetDBAdapter,
            'findOneExercise'
        ).mockImplementationOnce(
            (_userInfo) =>
                new Promise((resolve) => resolve(exerciseMockResponse))
        );

        const expectedResponse = [
            {
                dataValues: {
                    exerciseId: 115,
                    id: 5,
                    isLoad: true,
                    load: 25,
                    name: 'Triceps',
                    numRepetitions: 15,
                    numSets: 4,
                    sheetId: 1,
                    time: null,
                    userId: 1
                }
            }
        ];

        const userId = 1;

        const userExercises = await exerciseSheetExitGate.getUserExerciseSheets(
            userId
        );

        expect(
            exerciseSheetDBAdapter.findUserExerciseSheets
        ).toHaveBeenCalledTimes(1);
        expect(
            exerciseSheetDBAdapter.findUserExerciseSheets
        ).toHaveBeenCalledWith(userId);
        expect(exerciseSheetDBAdapter.findOneExercise).toHaveBeenCalledTimes(1);
        expect(userExercises).toEqual(expectedResponse);

        jest.clearAllMocks();
    });
});

describe('Find available exercises to an user', () => {
    it('Should be able to find available exercises to an user sheet', async () => {
        const userExercisesMockResponse = [
            [
                {
                    dataValues: {
                        exerciseId: 34,
                        name: 'Unavailable1',
                        type: 'abdomen',
                        isLoad: true
                    }
                },
                {
                    dataValues: {
                        exerciseId: 40,
                        name: 'Unavailable2',
                        type: 'abdomen',
                        isLoad: true
                    }
                },
                {
                    dataValues: {
                        exerciseId: 41,
                        name: 'Unavailable3',
                        type: 'abdomen',
                        isLoad: true
                    }
                }
            ],
            [
                {
                    dataValues: {
                        id: 1,
                        name: 'Abdômen Cross',
                        type: 'abdomen',
                        isLoad: true
                    }
                },
                {
                    dataValues: {
                        id: 2,
                        name: 'Abdômen Máquina',
                        type: 'abdomen',
                        isLoad: true
                    }
                },
                {
                    dataValues: {
                        id: 31,
                        name: 'Jump',
                        type: 'cardio',
                        isLoad: false
                    }
                }
            ]
        ];

        jest.spyOn(
            exerciseSheetDBAdapter,
            'findAvailableExercisesSheet'
        ).mockImplementationOnce(
            (_userInfo) =>
                new Promise((resolve) => resolve(userExercisesMockResponse))
        );

        const expectedResponse = [
            [34, 40, 41],
            [
                {
                    dataValues: {
                        id: 1,
                        name: 'Abdômen Cross',
                        type: 'abdomen',
                        isLoad: true
                    }
                },
                {
                    dataValues: {
                        id: 2,
                        name: 'Abdômen Máquina',
                        type: 'abdomen',
                        isLoad: true
                    }
                },
                {
                    dataValues: {
                        id: 31,
                        name: 'Jump',
                        type: 'cardio',
                        isLoad: false
                    }
                }
            ]
        ];

        const userId = 1;
        const sheetId = 2;

        const returnedValues =
            await exerciseSheetExitGate.getAvailableExercisesSheet(
                userId,
                sheetId
            );

        expect(
            exerciseSheetDBAdapter.findAvailableExercisesSheet
        ).toHaveBeenCalledTimes(1);
        expect(
            exerciseSheetDBAdapter.findAvailableExercisesSheet
        ).toHaveBeenCalledWith(userId, sheetId);
        expect(returnedValues).toEqual(expectedResponse);

        jest.clearAllMocks();
    });
});

describe('Post user exercises', () => {
    it('Should be able to post new user exercises', async () => {
        jest.spyOn(
            exerciseSheetDBAdapter,
            'newUserExercises'
        ).mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve())
        );

        const mockResponse = {
            dataValues: {
                id: 1,
                name: 'Abdômen Cross',
                type: 'abdomen',
                isLoad: true
            }
        };

        const expectedRequest = [
            {
                sheetId: 1,
                userId: 36,
                exerciseId: 4,
                load: 0,
                time: null,
                numRepetitions: 0,
                numSets: 0,
                isLoad: true
            },
            {
                sheetId: 1,
                userId: 36,
                exerciseId: 5,
                load: 0,
                time: null,
                numRepetitions: 0,
                numSets: 0,
                isLoad: true
            },
            {
                sheetId: 1,
                userId: 36,
                exerciseId: 7,
                load: 0,
                time: null,
                numRepetitions: 0,
                numSets: 0,
                isLoad: true
            }
        ];

        jest.spyOn(
            exerciseSheetDBAdapter,
            'findOneExercise'
        ).mockImplementation(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const userId = 36;
        const sheetId = 1;
        const exercisesIds = [4, 5, 7];

        await exerciseSheetExitGate.postUserExercises(
            userId,
            sheetId,
            exercisesIds
        );

        expect(exerciseSheetDBAdapter.findOneExercise).toHaveBeenCalledTimes(3);
        expect(exerciseSheetDBAdapter.newUserExercises).toHaveBeenCalledTimes(
            1
        );
        expect(exerciseSheetDBAdapter.newUserExercises).toHaveBeenCalledWith(
            expectedRequest
        );

        jest.clearAllMocks();
    });

    it('Should be able to post new user exercises with no load', async () => {
        jest.spyOn(
            exerciseSheetDBAdapter,
            'newUserExercises'
        ).mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve())
        );

        const mockResponse = {
            dataValues: {
                id: 1,
                name: 'Esteira',
                type: 'abdomen',
                isLoad: false
            }
        };

        const expectedRequest = [
            {
                sheetId: 1,
                userId: 36,
                exerciseId: 4,
                load: null,
                time: 0,
                numRepetitions: null,
                numSets: 0,
                isLoad: false
            },
            {
                sheetId: 1,
                userId: 36,
                exerciseId: 5,
                load: null,
                time: 0,
                numRepetitions: null,
                numSets: 0,
                isLoad: false
            },
            {
                sheetId: 1,
                userId: 36,
                exerciseId: 7,
                load: null,
                time: 0,
                numRepetitions: null,
                numSets: 0,
                isLoad: false
            }
        ];

        jest.spyOn(
            exerciseSheetDBAdapter,
            'findOneExercise'
        ).mockImplementation(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const userId = 36;
        const sheetId = 1;
        const exercisesIds = [4, 5, 7];

        await exerciseSheetExitGate.postUserExercises(
            userId,
            sheetId,
            exercisesIds
        );

        expect(exerciseSheetDBAdapter.findOneExercise).toHaveBeenCalledTimes(3);
        expect(exerciseSheetDBAdapter.newUserExercises).toHaveBeenCalledTimes(
            1
        );
        expect(exerciseSheetDBAdapter.newUserExercises).toHaveBeenCalledWith(
            expectedRequest
        );

        jest.clearAllMocks();
    });
});

describe('Put user exercise info', () => {
    it('Should be able to update the info of a registered user exercise', async () => {
        const mockResponse = {
            dataValues: {
                id: 1,
                sheetId: 1,
                userId: 1,
                exerciseId: 34,
                load: 54,
                time: null,
                numRepetitions: 20,
                numSets: 3,
                isLoad: true,
                createdAt: '2022-11-08T16:28:15.000Z',
                updatedAt: '2022-11-25T11:31:11.659Z'
            }
        };

        jest.spyOn(
            exerciseSheetDBAdapter,
            'updateUserExercise'
        ).mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const userExerciseIds = [
            (sheetId = '1'),
            (userId = 1),
            (exerciseId = '34')
        ];
        const userExerciseInfo = {
            numSets: 3,
            load: 54,
            numRepetitions: 20
        };

        const updateUserExercise = await exerciseSheetExitGate.putUserExercise(
            userExerciseIds,
            userExerciseInfo
        );

        expect(exerciseSheetDBAdapter.updateUserExercise).toHaveBeenCalledTimes(
            1
        );
        expect(exerciseSheetDBAdapter.updateUserExercise).toHaveBeenCalledWith(
            userExerciseIds,
            userExerciseInfo
        );
        expect(updateUserExercise).toEqual(mockResponse);

        jest.clearAllMocks();
    });

    it('Should be able to update just the available info of a registered user exercise', async () => {
        const mockResponse = {
            dataValues: {
                id: 1,
                sheetId: 1,
                userId: 1,
                exerciseId: 34,
                load: 54,
                time: null,
                numRepetitions: 20,
                numSets: 3,
                isLoad: true,
                createdAt: '2022-11-08T16:28:15.000Z',
                updatedAt: '2022-11-25T11:31:11.659Z'
            }
        };

        jest.spyOn(
            exerciseSheetDBAdapter,
            'updateUserExercise'
        ).mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const userExerciseIds = [
            (sheetId = '1'),
            (userId = 1),
            (exerciseId = '34')
        ];
        const userExerciseInfo = {
            numSets: 3,
            load: 54,
            numRepetitions: 20,
            unavailableInfo: undefined
        };

        const updateUserExercise = await exerciseSheetExitGate.putUserExercise(
            userExerciseIds,
            userExerciseInfo
        );

        expect(exerciseSheetDBAdapter.updateUserExercise).toHaveBeenCalledTimes(
            1
        );
        expect(exerciseSheetDBAdapter.updateUserExercise).toHaveBeenCalledWith(
            userExerciseIds,
            userExerciseInfo
        );
        expect(updateUserExercise).toEqual(mockResponse);

        jest.clearAllMocks();
    });

    it('Should not able to receive an empty info', async () => {
        const userExerciseIds = [
            (sheetId = '1'),
            (userId = 1),
            (exerciseId = '34')
        ];
        const userExerciseInfo = {};

        const error = new ServerError();
        error.ServerError(
            400,
            'É necessário fornecer as alterações desejadas.'
        );

        await expect(
            exerciseSheetExitGate.putUserExercise(
                userExerciseIds,
                userExerciseInfo
            )
        ).rejects.toEqual(error);

        jest.clearAllMocks();
    });
});

describe('Delete user exercises', () => {
    it('Should be able to delete registered user exercises', async () => {
        jest.spyOn(
            exerciseSheetDBAdapter,
            'eraseUserExercise'
        ).mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve())
        );

        const userExercisesIds = [4, 5, 7];

        await exerciseSheetExitGate.deleteUserExercise(userExercisesIds);

        expect(exerciseSheetDBAdapter.eraseUserExercise).toHaveBeenCalledTimes(
            1
        );
        expect(exerciseSheetDBAdapter.eraseUserExercise).toHaveBeenCalledWith(
            userExercisesIds
        );

        jest.clearAllMocks();
    });
});
