const USER_SERVICES = require('../../gates/user/userExitGate');

class Auth {
    async login(email, password) {
        try {
            const USER = USER_SERVICES.getUserByEmail(email);
            if (!USER) {
                throw new Error('Usuário não cadastrado.');
            }
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = new Auth;