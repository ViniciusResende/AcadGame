const EXPRESS = require('express');
const SERVER = EXPRESS();

const PASSPORT = require('passport');
const SESSION = require('express-session');

require('./infrastructure/authConf')(PASSPORT);
SERVER.use(SESSION({
    secret: process.env.PASSPORT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: parseInt(process.env.COOKIE_DURATION)
    }
}));

SERVER.use(PASSPORT.initialize());
SERVER.use(PASSPORT.session());

const BADGE_ROUTER = require('./adapters/badge/badgeRoute');
const EXERCISE_ROUTER = require('./adapters/exercise/exerciseRoute');
const USER_ROUTER = require('./adapters/user/userRoute');
const AUTH_ROUTER = require('./adapters/authentication/authRoute');

const BODY_PARSER = require("body-parser");
const COOKIE_PARSER = require("cookie-parser");


const errorHandler = (err, req, res, next) => {
    console.log('fbadsjkfbadsfbadskb');
    res.status(500).send(err.message);
}


SERVER.use(EXPRESS.json());
SERVER.use(BODY_PARSER.urlencoded({extended:true}));
SERVER.use(BODY_PARSER.json());
SERVER.use(COOKIE_PARSER());

SERVER.use('/badges', BADGE_ROUTER, errorHandler);
SERVER.use('/exercises', EXERCISE_ROUTER, errorHandler);
SERVER.use('/users', USER_ROUTER, errorHandler);
SERVER.use('/auth', AUTH_ROUTER, errorHandler);

SERVER.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Express initialized at ${process.env.EXPRESS_PORT}`);
});