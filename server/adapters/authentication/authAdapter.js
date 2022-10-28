const USER_DB_ADAPTER = require('../user/userDBAdapter');

const bcrypt = require('bcrypt');

const LocalStrategy = require('passport-local').Strategy;

class AuthAdapter {
    async login(user, password) {
        try {
            
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = new AuthAdapter;