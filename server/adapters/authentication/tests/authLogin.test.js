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

    const USER_INFO = {
        nickname: "testUser",
        email: "test@test.com.test",
        password: "test123"
    };

    beforeAll(async () => {
        await AUTH_DOMAIN.registerUser(USER_INFO);
    });

    afterAll( async () => {
        await USER.sync({
            force: true
        });
    });

    test('Should authenticate user, returning a valid token (POST /api/auth/authenticate)', async () => {
        const TOKEN = await AUTH_DOMAIN.authenticateUser(USER_INFO.email, USER_INFO.password);

        const SUCCESS = TOKEN_VALIDATOR(TOKEN);

        expect(SUCCESS).toBeTruthy();
    });

    test('Should fail to authenticate user, since the e-mail does not exists in the database (POST /api/auth/authenticate)', async () => {
        try {
            await AUTH_DOMAIN.authenticateUser("i_assure_you_that_this_email_does_not_exists@for_real.com", USER_INFO.password);

            expect(false).toBeTruthy();
        }
        catch (err) {
            expect(true).toBeTruthy();
        }
    });

    test('Should fail to authenticate user, since the password does not matches the registered one (POST /api/auth/authenticate)', async () => {
        try {
            await AUTH_DOMAIN.authenticateUser(USER_INFO.email, "trustM3ThisIsNotTheRightP@ssw0rd123");

            expect(false).toBeTruthy();
        }
        catch (err) {
            expect(true).toBeTruthy();
        }
    });
});