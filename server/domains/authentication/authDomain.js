const USER_SERVICES = require('../../gates/user/userExitGate');

const AUTH_GATE = require('../../gates/authentication/authExitGate');

class Auth {
    async login(email, password) {
        try {
            const USER = USER_SERVICES.getUserByEmail(email);
            if (!USER) {
                throw new Error('Usuário não cadastrado.');
            }

            await AUTH_GATE.makeLogin(USER, password);
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = new Auth;