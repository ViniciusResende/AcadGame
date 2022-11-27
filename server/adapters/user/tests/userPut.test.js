jest.mock('../../../infrastructure/db');

const USER_DOMAIN = require('../../../domains/user/userDomain');
const USER = require('../../../infrastructure/models/user');

describe('User updation', () => {

    const USER_COLLECTION = [{
        nickname: "testUser",
        email: "test@test.com.test",
        password: "test123"
    },{
        nickname: "testUser1",
        email: "test@testt.com.test",
        password: "test123"
    }];

    beforeAll(async () => {
        for (const USER_INFO of USER_COLLECTION) {
            await USER_DOMAIN.createUser(USER_INFO);
        }
    });

    test('Should update user\'s nickname (PUT /api/users/me)', async () => {
        const PREV_USER = await USER_DOMAIN.getSingleUser(1);
        expect(PREV_USER.nickname).toBe(USER_COLLECTION[0].nickname);

        await USER_DOMAIN.updateUserInfo(1, {
            nickname: 'pedrinho_testes_ltda.'
        });

        const CURR_USER = await USER_DOMAIN.getSingleUser(1);
        expect(CURR_USER.nickname).toBe('pedrinho_testes_ltda.');
    });

    afterAll(async () => {
        await USER.sync({
            force: true
        });
   });
});