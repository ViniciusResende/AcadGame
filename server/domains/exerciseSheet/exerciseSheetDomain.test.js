const exerciseSheetDomain = require('./exerciseSheetDomain');
const queryExerciseSheet = require('../../gates/exerciseSheet/exerciseSheetExitGate');
const serverError = require('../../utils/serverErrors');

jest.mock('../../gates/exerciseSheet/exerciseSheetExitGate', () => {
    return {
        getUserExerciseSheets: jest.fn(),
        getAvailableExercisesSheet: jest.fn(),
        postUserExercises: jest.fn(),
        putUserExercise: jest.fn(),
        deleteUserExercise: jest.fn()
    };
});

describe('Find user exercise sheets', () => {
    it('Should be able to find the user exercise sheets', async () => {
        const mockResponse = [
            (exerciseSheet = {
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
            }),
            (exerciseSheet = {
                dataValues: {
                    id: 14,
                    sheetId: 2,
                    userId: 1,
                    exerciseId: 13,
                    load: 16,
                    time: null,
                    numRepetitions: 21,
                    numSets: 4,
                    isLoad: true,
                    name: 'Rosca Direta Na Barra W'
                }
            }),
            (exerciseSheet = {
                dataValues: {
                    id: 10,
                    sheetId: 2,
                    userId: 1,
                    exerciseId: 22,
                    load: 20,
                    time: null,
                    numRepetitions: 15,
                    numSets: 3,
                    isLoad: true,
                    name: 'Banco Sóleo'
                }
            })
        ];

        const expectedResponse = {
            1: [
                {
                    dataValues: {
                        exerciseId: 115,
                        isLoad: true,
                        load: 25,
                        name: 'Triceps Corda',
                        numRepetitions: 15,
                        numSets: 4,
                        time: null
                    }
                }
            ],
            2: [
                {
                    dataValues: {
                        exerciseId: 13,
                        isLoad: true,
                        load: 16,
                        name: 'Rosca Direta Na Barra W',
                        numRepetitions: 21,
                        numSets: 4,
                        time: null
                    }
                },
                {
                    dataValues: {
                        exerciseId: 22,
                        isLoad: true,
                        load: 20,
                        name: 'Banco Sóleo',
                        numRepetitions: 15,
                        numSets: 3,
                        time: null
                    }
                }
            ],
            3: [],
            4: [],
            5: []
        };

        jest.spyOn(
            queryExerciseSheet,
            'getUserExerciseSheets'
        ).mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const userId = 1;

        const userSheets = await exerciseSheetDomain.queryUserExerciseSheets(
            userId
        );

        expect(queryExerciseSheet.getUserExerciseSheets).toHaveBeenCalledTimes(
            1
        );
        expect(queryExerciseSheet.getUserExerciseSheets).toHaveBeenCalledWith(
            userId
        );
        expect(userSheets).toEqual(expectedResponse);

        jest.clearAllMocks();
    });

    // throw error treatment
    // it('Should be able to throw an error', async () => {
    //     const error = new serverError();
    //     error.ServerError(
    //         400,
    //         `Não encontramos fichas de exercícios para o usuário com id 1`
    //     );

    //     jest.spyOn(
    //         queryExerciseSheet,
    //         'getUserExerciseSheets'
    //     ).mockImplementationOnce(() => Promise.reject((_rejects) => error));

    //     const userId = 1;

    //     await expect(
    //         exerciseSheetDomain.queryUserExerciseSheets(userId)
    //     ).rejects.toThrow(error);
    // });
});

describe('Find available exercises to an user', () => {
    it('Should de able to find available exercises to an user sheet of any type', async () => {
        const mockResponse = [
            [34, 40, 41],
            [
                (exercise = {
                    dataValues: {
                        id: 1,
                        name: 'Abdômen Cross',
                        type: 'abdomen',
                        isLoad: true
                    }
                }),
                (exercise = {
                    dataValues: {
                        id: 2,
                        name: 'Abdômen Máquina',
                        type: 'abdomen',
                        isLoad: true
                    }
                }),
                (exercise = {
                    dataValues: {
                        id: 31,
                        name: 'Jump',
                        type: 'cardio',
                        isLoad: false
                    }
                })
            ]
        ];

        jest.spyOn(
            queryExerciseSheet,
            'getAvailableExercisesSheet'
        ).mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const expectedResponse = [
            {
                dataValues: {
                    id: 1,
                    isLoad: true,
                    name: 'Abdômen Cross',
                    type: 'abdomen'
                }
            },
            {
                dataValues: {
                    id: 2,
                    isLoad: true,
                    name: 'Abdômen Máquina',
                    type: 'abdomen'
                }
            },
            {
                dataValues: {
                    id: 31,
                    isLoad: false,
                    name: 'Jump',
                    type: 'cardio'
                }
            }
        ];

        const userId = 36;
        const sheetId = 2;
        const type = undefined;

        const availableExercises =
            await exerciseSheetDomain.queryAvailableExercisesSheet(
                userId,
                sheetId,
                type
            );

        expect(
            queryExerciseSheet.getAvailableExercisesSheet
        ).toHaveBeenCalledTimes(1);
        expect(
            queryExerciseSheet.getAvailableExercisesSheet
        ).toHaveBeenCalledWith(userId, sheetId);
        expect(availableExercises).toEqual(expectedResponse);

        jest.clearAllMocks();
    });

    it('Should de able to find available exercises to an user sheet of a specific type', async () => {
        const mockResponse = [
            [34, 40, 41],
            [
                (exercise = {
                    dataValues: {
                        id: 1,
                        name: 'Abdômen Cross',
                        type: 'abdomen',
                        isLoad: true
                    }
                }),
                (exercise = {
                    dataValues: {
                        id: 2,
                        name: 'Abdômen Máquina',
                        type: 'abdomen',
                        isLoad: true
                    }
                }),
                (exercise = {
                    dataValues: {
                        id: 31,
                        name: 'Jump',
                        type: 'cardio',
                        isLoad: false
                    }
                })
            ]
        ];

        jest.spyOn(
            queryExerciseSheet,
            'getAvailableExercisesSheet'
        ).mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const expectedResponse = [
            {
                dataValues: {
                    id: 1,
                    isLoad: true,
                    name: 'Abdômen Cross',
                    type: 'abdomen'
                }
            },
            {
                dataValues: {
                    id: 2,
                    isLoad: true,
                    name: 'Abdômen Máquina',
                    type: 'abdomen'
                }
            }
        ];

        const userId = 36;
        const sheetId = 2;
        const type = 'abdomen';

        const availableExercises =
            await exerciseSheetDomain.queryAvailableExercisesSheet(
                userId,
                sheetId,
                type
            );

        expect(
            queryExerciseSheet.getAvailableExercisesSheet
        ).toHaveBeenCalledTimes(1);
        expect(
            queryExerciseSheet.getAvailableExercisesSheet
        ).toHaveBeenCalledWith(userId, sheetId);
        expect(availableExercises).toEqual(expectedResponse);

        jest.clearAllMocks();
    });
});

describe('Create user exercises', () => {
    it('Should be able to create new user exercises', async () => {
        jest.spyOn(
            queryExerciseSheet,
            'postUserExercises'
        ).mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve())
        );

        const userId = 36;
        const sheetId = 1;
        const exercisesIds = [4, 5, 7];

        await exerciseSheetDomain.createUserExercises(
            userId,
            sheetId,
            exercisesIds
        );

        expect(queryExerciseSheet.postUserExercises).toHaveBeenCalledTimes(1);
        expect(queryExerciseSheet.postUserExercises).toHaveBeenCalledWith(
            userId,
            sheetId,
            exercisesIds
        );

        jest.clearAllMocks();
    });
});

describe('Update user exercise info', () => {
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
            queryExerciseSheet,
            'putUserExercise'
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

        const updateUserExercise =
            await exerciseSheetDomain.updateUserExerciseInfo(
                userExerciseIds,
                userExerciseInfo
            );

        expect(queryExerciseSheet.putUserExercise).toHaveBeenCalledTimes(1);
        expect(queryExerciseSheet.putUserExercise).toHaveBeenCalledWith(
            userExerciseIds,
            userExerciseInfo
        );
        expect(updateUserExercise).toEqual(mockResponse);

        jest.clearAllMocks();
    });
});

describe('Delete user exercises', () => {
    it('Should be able to delete registered user exercises', async () => {
        jest.spyOn(
            queryExerciseSheet,
            'deleteUserExercise'
        ).mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve())
        );

        const userExercisesIds = [4, 5, 7];

        await exerciseSheetDomain.deleteUserExercise(userExercisesIds);

        expect(queryExerciseSheet.deleteUserExercise).toHaveBeenCalledTimes(1);
        expect(queryExerciseSheet.deleteUserExercise).toHaveBeenCalledWith(
            userExercisesIds
        );

        jest.clearAllMocks();
    });
});
