const USER = require('../domains/user/userDomain');

const BCRYPT = require('bcrypt');

const LOCAL_STRATEGY = require('passport-local').Strategy;


module.exports = async (passport) => {
    passport.serializeUser( (user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser( (id, done) => {
        try {
            const CURRENT_USER = USER.getSingleUser(id);
            done(null, CURRENT_USER);
        }
        catch (err) {
            done(err, null);
        }
    });
};