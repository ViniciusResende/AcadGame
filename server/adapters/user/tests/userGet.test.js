jest.mock('../../../infrastructure/db');

const USER_DOMAIN = require('../../../domains/user/userDomain');
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
        for (const USER_INFO of USER_COLLECTION) {
            await USER_DOMAIN.createUser(USER_INFO);
        }
    });

    test('Should return all registered users (GET /api/users/)', async () => {
        const EVERY_USER = await USER_DOMAIN.getEveryUser();

        expect(EVERY_USER.length).toBeGreaterThanOrEqual(3);
    });

    afterAll(async () => {
        await USER.sync({
            force: true
        });
   });
});