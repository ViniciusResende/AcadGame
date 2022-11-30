const userExitGate = require('./userExitGate');
const userDBAdapter = require('../../adapters/user/userDBAdapter');
const ServerError = require('../../utils/serverErrors');

jest.mock('../../adapters/user/userDBAdapter', () => {
    return {
        newUser: jest.fn(),
        getEveryUser: jest.fn(),
        getUserByPK: jest.fn(),
        getUserByEmail: jest.fn(),
        getUserByEmailWithPassword: jest.fn(),
        getUsersByNick: jest.fn(),
        getTopUsers: jest.fn(),
        updateUser: jest.fn(),
        eraseAccount: jest.fn()
    };
});

describe('Create user', () => {
    it('Should be able to create an user', async () => {
        const mockResponse = {
            profileIcon: 'default',
            id: 36,
            nickname: 'Test Name',
            email: 'test@gmail.com',
            password:
                '$2b$10$iYKCJ/iFrGtKcoeDcePH4eCcpKyBf/pg/gbaVkNJc3ketsVz/fcUe',
            score: 0,
            updatedAt: '2022-11-23T16:53:39.810Z',
            createdAt: '2022-11-23T16:53:39.810Z'
        };

        jest.spyOn(userDBAdapter, 'newUser').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const userInfo = {
            nickname: 'Test Name',
            email: 'test@gmail.com',
            password: 'test123'
        };

        const user = await userExitGate.createNewUser(userInfo);

        expect(userDBAdapter.newUser).toHaveBeenCalledTimes(1);
        expect(userDBAdapter.newUser).toHaveBeenCalledWith(userInfo);
        expect(user).toEqual(mockResponse);

        jest.clearAllMocks();
    });

    it('Should not be able to create an user without the required infos', async () => {
        const userInfo = {
            nickname: 'Test Name',
            email: 'test@gmail.com'
        };

        const error = new ServerError();
        error.ServerError(
            400,
            `A informação password é necessária para concluir o cadastro.`
        );

        await expect(userExitGate.createNewUser(userInfo)).rejects.toEqual(
            error
        );

        jest.clearAllMocks();
    });
});

describe('Find all users', () => {
    it('Should be able to find all registered users', async () => {
        const mockResponse = [
            {
                dataValues: {
                    id: 1,
                    nickname: 'The Rock',
                    profileIcon: 'special_god_of_war',
                    email: 'rock@gmail.com',
                    score: 3080
                }
            },
            {
                dataValues: {
                    id: 2,
                    nickname: 'Paulo Giga',
                    profileIcon: 'special_mario',
                    email: 'giga@gmail.com',
                    score: 2868
                }
            },
            {
                dataValues: {
                    id: 3,
                    nickname: 'Arnold Schwarzenegger',
                    profileIcon: 'special_assassins_screed',
                    email: 'arnold@gmail.com',
                    score: 3468
                }
            }
        ];

        jest.spyOn(userDBAdapter, 'getEveryUser').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const expectedResponse = [
            {
                id: 1,
                nickname: 'The Rock',
                profileIcon: 'special_god_of_war',
                email: 'rock@gmail.com',
                score: 3080
            },
            {
                id: 2,
                nickname: 'Paulo Giga',
                profileIcon: 'special_mario',
                email: 'giga@gmail.com',
                score: 2868
            },
            {
                id: 3,
                nickname: 'Arnold Schwarzenegger',
                profileIcon: 'special_assassins_screed',
                email: 'arnold@gmail.com',
                score: 3468
            }
        ];

        const everyUser = await userExitGate.getAllUsers();

        expect(userDBAdapter.getEveryUser).toHaveBeenCalledTimes(1);
        expect(everyUser).toEqual(expectedResponse);

        jest.clearAllMocks();
    });
});

describe('Find user by ID', () => {
    it('Should be able to find an existing user by his ID', async () => {
        const mockResponse = {
            id: 36,
            nickname: 'Test Name',
            profileIcon: 'default',
            email: 'test@gmail.com',
            password:
                '$2b$10$iYKCJ/iFrGtKcoeDcePH4eCcpKyBf/pg/gbaVkNJc3ketsVz/fcUe',
            score: 0
        };

        jest.spyOn(userDBAdapter, 'getUserByPK').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const userId = 36;

        const user = await userExitGate.getOneUser(userId);

        expect(userDBAdapter.getUserByPK).toHaveBeenCalledTimes(1);
        expect(userDBAdapter.getUserByPK).toHaveBeenCalledWith(userId);
        expect(user).toEqual(mockResponse);

        jest.clearAllMocks();
    });
});

describe('Find user by email', () => {
    it('Should be able to find an existing user by his email', async () => {
        const mockResponse = {
            id: 36,
            nickname: 'Test Name',
            profileIcon: 'default',
            email: 'test@gmail.com',
            password:
                '$2b$10$iYKCJ/iFrGtKcoeDcePH4eCcpKyBf/pg/gbaVkNJc3ketsVz/fcUe',
            score: 0
        };

        jest.spyOn(userDBAdapter, 'getUserByEmail').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const email = 'test@gmail.com';

        const user = await userExitGate.getUserByEmail(email);

        expect(userDBAdapter.getUserByEmail).toHaveBeenCalledTimes(1);
        expect(userDBAdapter.getUserByEmail).toHaveBeenCalledWith(email);
        expect(user).toEqual(mockResponse);

        jest.clearAllMocks();
    });
});

describe('Find user by email with password', () => {
    it('Should be able to find an existing user by his email with password', async () => {
        const mockResponse = {
            id: 36,
            nickname: 'Test Name',
            profileIcon: 'default',
            email: 'test@gmail.com',
            password:
                '$2b$10$iYKCJ/iFrGtKcoeDcePH4eCcpKyBf/pg/gbaVkNJc3ketsVz/fcUe',
            score: 0
        };

        jest.spyOn(
            userDBAdapter,
            'getUserByEmailWithPassword'
        ).mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const email = 'test@gmail.com';

        const user = await userExitGate.getUserByEmailWithPassword(email);

        expect(userDBAdapter.getUserByEmailWithPassword).toHaveBeenCalledTimes(
            1
        );
        expect(userDBAdapter.getUserByEmailWithPassword).toHaveBeenCalledWith(
            email
        );
        expect(user).toEqual(mockResponse);

        jest.clearAllMocks();
    });
});

describe('Find user by nickname', () => {
    it('Should be able to find an existing user by his nickname', async () => {
        const mockResponse = {
            id: 36,
            nickname: 'Test Name',
            profileIcon: 'default',
            email: 'test@gmail.com',
            password:
                '$2b$10$iYKCJ/iFrGtKcoeDcePH4eCcpKyBf/pg/gbaVkNJc3ketsVz/fcUe',
            score: 0
        };

        jest.spyOn(userDBAdapter, 'getUsersByNick').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const email = 'test@gmail.com';

        const user = await userExitGate.getUserByNickname(email);

        expect(userDBAdapter.getUsersByNick).toHaveBeenCalledTimes(1);
        expect(userDBAdapter.getUsersByNick).toHaveBeenCalledWith(email);
        expect(user).toEqual(mockResponse);

        jest.clearAllMocks();
    });
});

describe('Find top rank users', () => {
    it('Should be able to find the top rank users', async () => {
        const mockResponse = [
            {
                dataValues: {
                    id: 16,
                    nickname: 'Test Name 1',
                    profileIcon: 'default',
                    email: 'test1@gmail.com',
                    password:
                        '$2b$10$iYKCJ/iFrGtKcoeDcePH4eCcpKyBf/pg/gbaVkNJc3ketsVz/fcUe',
                    score: 2000
                }
            },
            {
                dataValues: {
                    id: 36,
                    nickname: 'Test Name 2',
                    profileIcon: 'default',
                    email: 'test2@gmail.com',
                    password:
                        '$2b$10$iYKCJ/iFrGefasefeDcePH4eCcpKyBf/pg/gbaVkNJc3ketsVz/fcUe',
                    score: 1500
                }
            },
            {
                dataValues: {
                    id: 20,
                    nickname: 'Test Name 3',
                    profileIcon: 'default',
                    email: 'test3@gmail.com',
                    password:
                        '$2b$10$iYKCJ/iFrGtKcoeDcePH4eCcpKyBf/pg/gbaVerfl3ketsVz/fcUe',
                    score: 1000
                }
            }
        ];

        jest.spyOn(userDBAdapter, 'getTopUsers').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const expectedResponse = [
            {
                id: 16,
                nickname: 'Test Name 1',
                profileIcon: 'default',
                email: 'test1@gmail.com',
                password:
                    '$2b$10$iYKCJ/iFrGtKcoeDcePH4eCcpKyBf/pg/gbaVkNJc3ketsVz/fcUe',
                score: 2000
            },
            {
                id: 36,
                nickname: 'Test Name 2',
                profileIcon: 'default',
                email: 'test2@gmail.com',
                password:
                    '$2b$10$iYKCJ/iFrGefasefeDcePH4eCcpKyBf/pg/gbaVkNJc3ketsVz/fcUe',
                score: 1500
            }
        ];

        const rank = 2;

        const topUsers = await userExitGate.getTopRankUsers(rank);

        expect(userDBAdapter.getTopUsers).toHaveBeenCalledTimes(1);
        expect(topUsers).toEqual(expectedResponse);

        jest.clearAllMocks();
    });
});

describe('Update user info', () => {
    it('Should be able to update a registered user info', async () => {
        const mockResponse = {
            id: 16,
            nickname: 'Test Name 1',
            profileIcon: 'default',
            email: 'test1@gmail.com',
            password:
                '$2b$10$iYKCJ/iFrGtKcoeDcePH4eCcpKyBf/pg/gbaVkNJc3ketsVz/fcUe',
            score: 2000
        };

        jest.spyOn(userDBAdapter, 'updateUser').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const userId = 1;
        const userInfo = {
            nickname: 'Test Name 1',
            profileIcon: 'default'
        };

        const user = await userExitGate.updateUserInfo(userId, userInfo);

        expect(userDBAdapter.updateUser).toHaveBeenCalledTimes(1);
        expect(userDBAdapter.updateUser).toHaveBeenCalledWith(userId, userInfo);
        expect(user).toEqual(mockResponse);

        jest.clearAllMocks();
    });

    it('Should not be able to update a registered user without info', async () => {
        jest.spyOn(userDBAdapter, 'updateUser').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve())
        );

        const userId = 1;
        const userInfo = {};

        const user = await userExitGate.updateUserInfo(userId, userInfo);

        expect(user).toEqual(undefined);

        jest.clearAllMocks();
    });

    it('Should not be able to update an invalid user info', async () => {
        jest.spyOn(userDBAdapter, 'updateUser').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve())
        );

        const userId = 1;
        const userInfo = {
            nickname: 'Test Name 1',
            profileIcon: 'default',
            invalidInfo: undefined
        };

        const error = new ServerError();
        error.ServerError(400, `Uma das propriedades fornecidas não é válida.`);

        await expect(
            userExitGate.updateUserInfo(userId, userInfo)
        ).rejects.toEqual(error);

        jest.clearAllMocks();
    });
});

describe('Delete user accounte', () => {
    it('Should be able to delete a registered user', async () => {
        jest.spyOn(userDBAdapter, 'eraseAccount').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve())
        );

        const userId = 1;

        await userExitGate.deleteAccount(userId);

        expect(userDBAdapter.eraseAccount).toHaveBeenCalledTimes(1);
        expect(userDBAdapter.eraseAccount).toHaveBeenCalledWith(userId);

        jest.clearAllMocks();
    });
});
