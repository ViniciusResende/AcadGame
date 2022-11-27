const userDomain = require('./userDomain');
const queryUser = require('../../gates/user/userExitGate');
const serverError = require('../../utils/serverErrors');

jest.mock('../../gates/user/userExitGate', () => {
    return {
        createNewUser: jest.fn(),
        getAllUsers: jest.fn(),
        getUserByEmail: jest.fn(),
        getUserByEmailWithPassword: jest.fn(),
        getUserByNickname: jest.fn(),
        getTopRankUsers: jest.fn(),
        getOneUser: jest.fn(),
        updateUserInfo: jest.fn(),
        deleteAccount: jest.fn()
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

        jest.spyOn(queryUser, 'createNewUser').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const userInfo = {
            nickname: 'Test Name',
            email: 'test@gmail.com',
            password: 'test123'
        };

        const user = await userDomain.createUser(userInfo);

        expect(queryUser.createNewUser).toHaveBeenCalledTimes(1);
        expect(queryUser.createNewUser).toHaveBeenCalledWith(userInfo);
        expect(user).toEqual(mockResponse);
    });
});

describe('Get every user', () => {
    it('Should be able to find all registered users', async () => {
        const mockResponse = [
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

        jest.spyOn(queryUser, 'getAllUsers').mockImplementationOnce(
            () => new Promise((resolve) => resolve(mockResponse))
        );

        const everyUser = await userDomain.getEveryUser();

        expect(queryUser.getAllUsers).toHaveBeenCalledTimes(1);
        expect(everyUser).toEqual(mockResponse);

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

        jest.spyOn(queryUser, 'getOneUser').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const userId = 36;

        const user = await userDomain.getSingleUser(userId);

        expect(queryUser.getOneUser).toHaveBeenCalledTimes(1);
        expect(queryUser.getOneUser).toHaveBeenCalledWith(userId);
        expect(user).toEqual(mockResponse);

        jest.clearAllMocks();
    });

    it('Should be able to receive null if ID is not registered', async () => {
        const mockResponse = null;

        jest.spyOn(queryUser, 'getOneUser').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const userId = 36;

        const user = await userDomain.getSingleUser(userId);

        expect(queryUser.getOneUser).toHaveBeenCalledTimes(1);
        expect(queryUser.getOneUser).toHaveBeenCalledWith(userId);
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

        jest.spyOn(queryUser, 'getUserByEmail').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const email = 'test@gmail.com';

        const user = await userDomain.getUserByEmail(email);

        expect(queryUser.getUserByEmail).toHaveBeenCalledTimes(1);
        expect(queryUser.getUserByEmail).toHaveBeenCalledWith(email);
        expect(user).toEqual(mockResponse);

        jest.clearAllMocks();
    });

    it('Should be able to receive null if email is not registered', async () => {
        const mockResponse = null;

        jest.spyOn(queryUser, 'getUserByEmail').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const email = 'test@gmail.com';

        const user = await userDomain.getUserByEmail(email);

        expect(queryUser.getUserByEmail).toHaveBeenCalledTimes(1);
        expect(queryUser.getUserByEmail).toHaveBeenCalledWith(email);
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
            queryUser,
            'getUserByEmailWithPassword'
        ).mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const email = 'test@gmail.com';

        const user = await userDomain.getUserByEmailWithPassword(email);

        expect(queryUser.getUserByEmailWithPassword).toHaveBeenCalledTimes(1);
        expect(queryUser.getUserByEmailWithPassword).toHaveBeenCalledWith(
            email
        );
        expect(user).toEqual(mockResponse);

        jest.clearAllMocks();
    });

    it('Should be able to receive null if email is not registered', async () => {
        const mockResponse = null;

        jest.spyOn(
            queryUser,
            'getUserByEmailWithPassword'
        ).mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const email = 'test@gmail.com';

        const user = await userDomain.getUserByEmailWithPassword(email);

        expect(queryUser.getUserByEmailWithPassword).toHaveBeenCalledTimes(1);
        expect(queryUser.getUserByEmailWithPassword).toHaveBeenCalledWith(
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

        jest.spyOn(queryUser, 'getUserByNickname').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const nickname = 'Test Name';

        const user = await userDomain.getUserByNickname(nickname);

        expect(queryUser.getUserByNickname).toHaveBeenCalledTimes(1);
        expect(queryUser.getUserByNickname).toHaveBeenCalledWith(nickname);
        expect(user).toEqual(mockResponse);

        jest.clearAllMocks();
    });
});

describe('Get top rank users', () => {
    it('Should be able to find the users with the greater score', async () => {
        const mockResponse = [
            {
                id: 36,
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
            },
            {
                id: 36,
                nickname: 'Test Name 3',
                profileIcon: 'default',
                email: 'test3@gmail.com',
                password:
                    '$2b$10$iYKCJ/iFrGtKcoeDcePH4eCcpKyBf/pg/gbaVerfl3ketsVz/fcUe',
                score: 1000
            }
        ];

        jest.spyOn(queryUser, 'getTopRankUsers').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const rank = 3;

        const topRankUsers = await userDomain.getTopRankUsers(rank);

        expect(queryUser.getTopRankUsers).toHaveBeenCalledTimes(1);
        expect(queryUser.getTopRankUsers).toHaveBeenCalledWith(rank);
        expect(topRankUsers).toEqual(mockResponse);

        jest.clearAllMocks();
    });
});

describe('Update user info', () => {
    it('Should be able to update a registered user', async () => {
        const emailMockResponse = {
            id: 36,
            nickname: 'Test Name',
            profileIcon: 'default',
            email: 'test@gmail.com',
            password:
                '$2b$10$iYKCJ/iFrGtKcoeDcePH4eCcpKyBf/pg/gbaVkNJc3ketsVz/fcUe',
            score: 0
        };

        const updateMockResponse = {
            id: 36,
            nickname: 'Test Name',
            profileIcon: 'default',
            email: 'test@gmail.com',
            password:
                '$2b$10$iYKCJ/iFrGtKcoeDcePH4eCcpKyBf/pg/gbaVkNJc3ketsVz/fcUe',
            score: 0
        };

        jest.spyOn(queryUser, 'getUserByEmail').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(emailMockResponse))
        );

        jest.spyOn(queryUser, 'updateUserInfo').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(updateMockResponse))
        );

        const id = 36;
        const userInfo = {
            nickname: 'Test Name',
            profileIcon: 'default',
            email: 'test@gmail.com'
        };

        const user = await userDomain.updateUserInfo(id, userInfo);

        expect(queryUser.updateUserInfo).toHaveBeenCalledTimes(1);
        expect(queryUser.updateUserInfo).toHaveBeenCalledWith(id, userInfo);
        expect(user).toEqual(updateMockResponse);

        jest.clearAllMocks();
    });

    it('Should not be able to change your email to one already registered', async () => {
        const emailMockResponse = {
            id: 10,
            nickname: 'Test Existing Name',
            profileIcon: 'default',
            email: 'testexisting@gmail.com',
            password:
                '$2b$10$iYKCJ/iFrGtKcoeDcePH4eCcpKyBf/pg/gbaVkNJc3ketsVz/fcUe',
            score: 0
        };

        jest.spyOn(userDomain, 'getUserByEmail').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(emailMockResponse))
        );

        const userId = 36;
        const userInfo = {
            nickname: 'Test Name',
            profileIcon: 'default',
            email: 'testexisting@gmail.com'
        };

        let error = new serverError();
        error.ServerError(400, 'Este e-mail já é utilizado por outra conta.');

        await expect(
            userDomain.updateUserInfo(userId, userInfo)
        ).rejects.toEqual(error);
        expect(userDomain.getUserByEmail).toHaveBeenCalledTimes(1);
        expect(userDomain.getUserByEmail).toHaveBeenCalledWith(userInfo.email);

        jest.clearAllMocks();
    });
});

describe('Delete user account', () => {
    it('Should be able to delete an registered user account', async () => {
        jest.spyOn(queryUser, 'deleteAccount').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve())
        );

        const userId = 1;

        await userDomain.deleteUserAccount(userId);

        expect(queryUser.deleteAccount).toHaveBeenCalledTimes(1);
        expect(queryUser.deleteAccount).toHaveBeenCalledWith(userId);

        jest.clearAllMocks();
    });
});
