jest.mock('../../../infrastructure/db');

const AUTH_DOMAIN = require('../../../domains/authentication/authDomain');
const USER = require('../../../infrastructure/models/user');

describe('User authentication', () => {

    const USER_COLLECTION = [{
        nickname: "testUser",
        email: "test@test.com.test",
        password: "test123"
    },{
        nickname: "testUser1",
        email: "test@testt.com.test",
        password: "test123"
    },{
        nickname: "testUser2",
        email: "test@testtt.com.test",
        password: "test123"
    }];

    beforeAll(async () => {
        await USER.sync({
            force: true
        });

        USER_COLLECTION.forEach(async (USER_INFO) => {
            await AUTH_DOMAIN.registerUser(USER_INFO);
        });
    });
});