const PASSPORT = require('passport');

class AuthAdapter {
    async login(req, res, next) {
        try {
            await PASSPORT.authenticate('local')(req, res, next);
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = new AuthAdapter;