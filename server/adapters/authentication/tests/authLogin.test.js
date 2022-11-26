jest.mock('../../../infrastructure/db');

const AUTH_DOMAIN = require('../../../domains/authentication/authDomain');
const USER = require('../../../infrastructure/models/user');

const jwt = require('jsonwebtoken');

const TOKEN_VALIDATOR = (TOKEN) => {
    let isValid = true;

    if(!TOKEN)
        return !isValid;

    jwt.verify(TOKEN, process.env.TEST_JWT_SECRET, (err, decoded) => {
        if(err)
            return !isValid;
    });

    return isValid;
};

describe('User authentication', () => {

    beforeAll(async () => {
        await USER.sync({
            force: true
        });

        await AUTH_DOMAIN.registerUser({
            nickname: "testUser",
            email: "test@test.com.test",
            password: "test123"
        });
    });

    test('Should authenticate user, returning a valid token (POST /api/auth/authenticate)', async () => {
        const TOKEN = await AUTH_DOMAIN.authenticateUser("test@test.com.test", "test123");

        const SUCCESS = TOKEN_VALIDATOR(TOKEN);

        expect(SUCCESS).toBeTruthy();
    });
});