const authDomain = require('./authDomain');
const authExitGate = require('../../gates/authentication/authExitGate');
const serverError = require('../../utils/serverErrors');

jest.mock('../../gates/authentication/authExitGate', () => {
    return {
        registerUser: jest.fn(),
        authenticateUser: jest.fn()
    };
});

describe('Register an user', () => {
    it('Should be able to get a json web token when registering an user', async () => {
        const mockResponse =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzcsImlhdCI6MTY2OTM4NTczNywiZXhwIjoxNjY5NDcyMTM3fQ.5opl60V-g9ClpN5zvXQLBQpeptumdXrKA3DRSllz68Y';

        jest.spyOn(authExitGate, 'registerUser').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const userInfo = {
            nickname: 'Test Name',
            email: 'test@gmail.com',
            password: 'Test12345'
        };

        const token = await authDomain.registerUser(userInfo);

        expect(authExitGate.registerUser).toHaveBeenCalledTimes(1);
        expect(authExitGate.registerUser).toHaveBeenCalledWith(userInfo);
        expect(token).toEqual(mockResponse);
    });

    it('Should be able to throw an error', async () => {
        const mockError = new serverError();
        mockError.ServerError(400, 'Badge not found');

        jest.spyOn(authExitGate, 'registerUser').mockImplementation(() => {
            throw mockError;
        });
        try {
            const id = 1;

            await authDomain.registerUser(id);
        } catch (err) {
            expect(err).toBe(mockError);
        }
    });
});

describe('Authenticate an user', () => {
    it('Should be able to get a json web token when logging in', async () => {
        const mockResponse =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzcsImlhdCI6MTY2OTM4NTczNywiZXhwIjoxNjY5NDcyMTM3fQ.5opl60V-g9ClpN5zvXQLBQpeptumdXrKA3DRSllz68Y';

        jest.spyOn(authExitGate, 'authenticateUser').mockImplementationOnce(
            (_userInfo) => new Promise((resolve) => resolve(mockResponse))
        );

        const email = 'test@gmail.com';
        const password = 'Test12345';

        const token = await authDomain.authenticateUser(email, password);

        expect(authExitGate.authenticateUser).toHaveBeenCalledTimes(1);
        expect(authExitGate.authenticateUser).toHaveBeenCalledWith(
            email,
            password
        );
        expect(token).toEqual(mockResponse);
    });

    it('Should be able to throw an error', async () => {
        const mockError = new serverError();
        mockError.ServerError(400, 'Badge not found');

        jest.spyOn(authExitGate, 'authenticateUser').mockImplementation(() => {
            throw mockError;
        });
        try {
            const id = 1;

            await authDomain.authenticateUser(id);
        } catch (err) {
            expect(err).toBe(mockError);
        }
    });
});
