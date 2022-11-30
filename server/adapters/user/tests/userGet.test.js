jest.mock('../../../infrastructure/db');

const USER_DOMAIN = require('../../../domains/user/userDomain');
const USER = require('../../../infrastructure/models/user');

describe('User getters', () => {

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

    test('Should return a single registered user (GET /api/users/me)', async () => {
        const USER = await USER_DOMAIN.getSingleUser(1);

        expect(USER).toHaveProperty('nickname');

        expect(USER).toHaveProperty('email');

        expect(USER).toHaveProperty('password');
    });

    test('Should get an user by e-mail (GET /api/users/email)', async () => {
        const USER = await USER_DOMAIN.getUserByEmail('test@testt.com.test');

        expect(USER.nickname).toBe('testUser1');
    });

    test('Should return all users that matches a given nickname (GET /api/users/nickname)', async () => {
        const USERS = await USER_DOMAIN.getUserByNickname('testUser');

        expect(USERS.length).toBeGreaterThanOrEqual(3);
    });

    test('Should return the top three users of the app (GET /api/users/top/:rank)', async () => {
        for (let id of [1, 2, 3]) {
            await USER_DOMAIN.updateUserInfo(id, {
                score: (1000 + 1000*id)
            });
        }

        const TOP_RANK = await USER_DOMAIN.getTopRankUsers(3);

        expect(TOP_RANK[0].nickname).toBe(USER_COLLECTION[2].nickname);

        expect(TOP_RANK[0].email).toBe(USER_COLLECTION[2].email);
    });

    afterAll(async () => {
        await USER.sync({
            force: true
        });
   });
});