const userDomain = require('./userDomain');
const queryUser = require('../../gates/user/userExitGate');
const serverError = require('../../utils/serverErrors');

jest.mock('../../gates/user/userExitGate', () => {
    return {
        createNewUser: jest.fn(),
        getUserByEmail: jest.fn(),
        updateUserInfo: jest.fn()
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
