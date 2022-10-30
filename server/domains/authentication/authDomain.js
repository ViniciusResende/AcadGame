const USER_SERVICES = require('../../gates/user/userExitGate');

const AUTH_GATE = require('../../gates/authentication/authExitGate');

class Auth {
    async login(req, res, next) {
        try {
            const USER = USER_SERVICES.getUserByEmail(req.body.email);
            if (!USER) {
                throw new Error('Usuário não cadastrado.');
            }

            await AUTH_GATE.makeLogin(req, res, next);
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = new Auth;