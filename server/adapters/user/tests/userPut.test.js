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

    test('Should update user\'s e-mail (PUT /api/users/me)', async () => {
        const PREV_USER = await USER_DOMAIN.getSingleUser(1);
        expect(PREV_USER.email).toBe(USER_COLLECTION[0].email);

        await USER_DOMAIN.updateUserInfo(1, {
            email: 'pedro@pedro.pedro'
        });

        const CURR_USER = await USER_DOMAIN.getSingleUser(1);
        expect(CURR_USER.email).toBe('pedro@pedro.pedro');
    });

    test('Should fail to update user\'s e-mail, since there is already another user registered with the provided one (PUT /api/users/me)', async () => {
        try {    
            await USER_DOMAIN.updateUserInfo(1, {
                email: 'test@testt.com.test'
            });

            expect(false).toBeTruthy();
        }
        catch (err) {
            expect(err.message).toBe("Este e-mail já é utilizado por outra conta.");
        }
    });

    test('Should fail to update user, since the given property is not valid (PUT /api/users/me)', async () => {
        try {    
            await USER_DOMAIN.updateUserInfo(1, {
                isAMcLovinLover: true
            });

            expect(false).toBeTruthy();
        }
        catch (err) {
            expect(err.message).toBe("Uma das propriedades fornecidas não é válida.");
        }
    });
    

    afterAll(async () => {
        await USER.sync({
            force: true
        });
   });
});