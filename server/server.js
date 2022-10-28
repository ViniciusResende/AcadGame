const EXPRESS = require('express');
const SERVER = EXPRESS();

const BADGE_ROUTER = require('./adapters/badge/badgeRoute');
const EXERCISE_ROUTER = require('./adapters/exercise/exerciseRoute');
const USER_ROUTER = require('./adapters/user/userRoute');

const BODY_PARSER = require("body-parser");
const COOKIE_PARSER = require("cookie-parser");

SERVER.use(EXPRESS.json());
SERVER.use(BODY_PARSER.urlencoded({extended:true}));
SERVER.use(BODY_PARSER.json());
SERVER.use(COOKIE_PARSER());

SERVER.use('/badges', BADGE_ROUTER);
SERVER.use('/exercises', EXERCISE_ROUTER);
SERVER.use('/users', USER_ROUTER);

SERVER.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Express initialized at ${process.env.EXPRESS_PORT}`);
});