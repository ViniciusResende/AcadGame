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

    passport.use(new LOCAL_STRATEGY({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            const CURRENT_USER = await USER.getUserByEmail(email);

            if (!CURRENT_USER) {
                return done(null, false);
            }

            const MATCHING_PASSWORD = BCRYPT.compareSync(password, CURRENT_USER.password);

            if (!MATCHING_PASSWORD) {
                return done(null, false);
            }

            return done(null, CURRENT_USER);
        }
        catch (err) {
            done(err, false);
        }
    }
    ));
};