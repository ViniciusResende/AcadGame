jest.mock('../../../infrastructure/db');

const USER_DOMAIN = require('../../../domains/user/userDomain');
const USER = require('../../../infrastructure/models/user');

const bcrypt = require('bcrypt');

const PASSWORD_CHECKER = async (inputedPassword, hashedPassword) => {
    try {
        const MATCH = await bcrypt.compare(inputedPassword, hashedPassword);

        if(!MATCH)
            return false;
        else
            return true;
    }
    catch(err) {
        throw err;
    }
}

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

    test('Should update user\'s password (PUT /api/users/me)', async () => {
        const PREV_USER = await USER_DOMAIN.getUserByEmailWithPassword('test@test.com.test');
        expect(PASSWORD_CHECKER('test123', PREV_USER.password)).toBeTruthy();
        
        await USER_DOMAIN.updateUserInfo(1, {
            password: 'big_integration_tests_lover_haha'
        });
        
        const CURR_USER = await USER_DOMAIN.getUserByEmailWithPassword('test@test.com.test');
        expect(PASSWORD_CHECKER('big_integration_tests_lover_haha', CURR_USER.password)).toBeTruthy();
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
    
    test('Should fail to update user, since the given user id does not exists in the database (PUT /api/users/me)', async () =>{
        try {    
            await USER_DOMAIN.updateUserInfo(21122002, {
                email: "i_am_a_mc_lovin_lover@mc_lovers.lovin"
            });
    
            expect(false).toBeTruthy();
        }
        catch (err) {
            expect(err.message).toBe("Usuário inexistente.");
        }

    });
    

    afterAll(async () => {
        await USER.sync({
            force: true
        });
   });
});