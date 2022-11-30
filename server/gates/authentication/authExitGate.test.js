const authExitGate = require('./authExitGate');
const authAdapter = require('../../adapters/authentication/authAdapter');
const userDomain = require('../../domains/user/userDomain');
const ServerError = require('../../utils/serverErrors');

jest.mock('../../adapters/authentication/authAdapter', () => {
    return {
        generateToken: jest.fn(),
        checkPasswords: jest.fn()
    };
});

jest.mock('../../domains/user/userDomain', () => {
    return {
        createUser: jest.fn(),
        getUserByEmail: jest.fn()
    };
});

describe('Register and authenticate user', () => {
    it('Should be able to register a new user and return a token', async () => {
        const userMockResponse = {
            dataValues: {
                profileIcon: 'default',
                id: 39,
                nickname: 'Test Name',
                email: 'test@gmail.com',
                password:
                    '$2b$10$dNqqmLKhDbzAB.qSEXjrsuF6hjUvSM7YKDLRN9SwrbCMh5A9E70Ve',
                score: 0,
                updatedAt: '2022-11-29T12:44:02.579Z',
                createdAt: '2022-11-29T12:44:02.579Z'
            }
        };

        jest.spyOn(userDomain, 'createUser').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(userMockResponse))
        );

        const tokenMockResponse =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzksImlhdCI6MTY2OTcyNTg0MiwiZXhwIjoxNjY5ODEyMjQyfQ.dge2qAJeEPw4BFdkwZBnyRT2Qh7OMGXKGimM_3VXAMU';

        jest.spyOn(authAdapter, 'generateToken').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(tokenMockResponse))
        );

        const userInfo = {
            nickname: 'Test Name',
            email: 'test@gmail.com',
            password: 'testPassword123'
        };

        const token = await authExitGate.registerUser(userInfo);

        expect(userDomain.createUser).toHaveBeenCalledTimes(1);
        expect(userDomain.createUser).toHaveBeenCalledWith(userInfo);

        expect(authAdapter.generateToken).toHaveBeenCalledTimes(1);
        expect(authAdapter.generateToken).toHaveBeenCalledWith({
            id: userMockResponse.id
        });

        expect(token).toEqual(tokenMockResponse);

        jest.clearAllMocks();
    });
});

describe('Authenticate user', () => {
    it('Should be able to return an authenticate token with the correct password', async () => {
        const userMockResponse = {
            dataValues: {
                profileIcon: 'default',
                id: 39,
                nickname: 'Test Name',
                email: 'test@gmail.com',
                password:
                    '$2b$10$dNqqmLKhDbzAB.qSEXjrsuF6hjUvSM7YKDLRN9SwrbCMh5A9E70Ve',
                score: 0,
                updatedAt: '2022-11-29T12:44:02.579Z',
                createdAt: '2022-11-29T12:44:02.579Z'
            }
        };

        jest.spyOn(userDomain, 'getUserByEmail').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(userMockResponse))
        );

        const matchPasswordsMockResponse = true;

        jest.spyOn(authAdapter, 'checkPasswords').mockImplementationOnce(
            (_userInfo) =>
                new Promise((resolve) => resolve(matchPasswordsMockResponse))
        );

        const tokenMockResponse =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzksImlhdCI6MTY2OTcyNTg0MiwiZXhwIjoxNjY5ODEyMjQyfQ.dge2qAJeEPw4BFdkwZBnyRT2Qh7OMGXKGimM_3VXAMU';

        jest.spyOn(authAdapter, 'generateToken').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(tokenMockResponse))
        );

        const email = 'test@gmail.com';
        const password = 'testPassword123';

        const token = await authExitGate.authenticateUser(email, password);

        expect(userDomain.getUserByEmail).toHaveBeenCalledTimes(1);
        expect(userDomain.getUserByEmail).toHaveBeenCalledWith(email);

        expect(authAdapter.checkPasswords).toHaveBeenCalledTimes(1);
        expect(authAdapter.checkPasswords).toHaveBeenCalledWith(
            password,
            userMockResponse.password
        );

        expect(authAdapter.generateToken).toHaveBeenCalledTimes(1);
        expect(authAdapter.generateToken).toHaveBeenCalledWith({
            id: userMockResponse.id
        });

        expect(token).toEqual(tokenMockResponse);

        jest.clearAllMocks();
    });

    it('Should not be able to authenticate an unregistered user', async () => {
        const userMockResponse = undefined;

        jest.spyOn(userDomain, 'getUserByEmail').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(userMockResponse))
        );

        const error = new ServerError();
        error.ServerError(400, 'E-mail não cadastrado.');

        const email = 'unregisteredMail@gmail.com';
        const password = 'testPassword123';

        await expect(
            authExitGate.authenticateUser(email, password)
        ).rejects.toEqual(error);

        expect(userDomain.getUserByEmail).toHaveBeenCalledTimes(1);
        expect(userDomain.getUserByEmail).toHaveBeenCalledWith(email);

        jest.clearAllMocks();
    });

    it('Should not be able to return an authenticate token with the incorrect password', async () => {
        const userMockResponse = {
            dataValues: {
                profileIcon: 'default',
                id: 39,
                nickname: 'Test Name',
                email: 'test@gmail.com',
                password:
                    '$2b$10$dNqqmLKhDbzAB.qSEXjrsuF6hjUvSM7YKDLRN9SwrbCMh5A9E70Ve',
                score: 0,
                updatedAt: '2022-11-29T12:44:02.579Z',
                createdAt: '2022-11-29T12:44:02.579Z'
            }
        };

        jest.spyOn(userDomain, 'getUserByEmail').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(userMockResponse))
        );

        const matchPasswordsMockResponse = false;

        jest.spyOn(authAdapter, 'checkPasswords').mockImplementationOnce(
            (_userInfo) =>
                new Promise((resolve) => resolve(matchPasswordsMockResponse))
        );

        const email = 'test@gmail.com';
        const password = 'incorrectPassword';

        const error = new ServerError();
        error.ServerError(400, 'Senha inválida.');

        await expect(
            authExitGate.authenticateUser(email, password)
        ).rejects.toEqual(error);

        expect(userDomain.getUserByEmail).toHaveBeenCalledTimes(1);
        expect(userDomain.getUserByEmail).toHaveBeenCalledWith(email);

        expect(authAdapter.checkPasswords).toHaveBeenCalledTimes(1);
        expect(authAdapter.checkPasswords).toHaveBeenCalledWith(
            password,
            userMockResponse.password
        );

        jest.clearAllMocks();
    });
});
