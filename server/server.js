const EXPRESS = require('express');
const CORS = require('cors');
const SERVER = EXPRESS();

const BADGE_ROUTER = require('./adapters/badge/badgeRoute');
const USER_ROUTER = require('./adapters/user/userRoute');
const AUTH_ROUTER = require('./adapters/authentication/authRoute');
const EXERCISE_SHEET_ROUTER = require('./adapters/exerciseSheet/exerciseSheetRouter');
const DAY_SCORE_ROUTER = require('./adapters/dayScore/dayScoreRouter');
const GYM_PALS_ROUTER = require('./adapters/gymPal/gymPalRouter');

const AUTHENTICATION = require('./utils/authMiddleware');
const ERROR_HANDLING = require('./utils/errorMiddleware');

const BODY_PARSER = require("body-parser");
const COOKIE_PARSER = require("cookie-parser");

SERVER.use(CORS());
SERVER.use(EXPRESS.json());
SERVER.use(BODY_PARSER.urlencoded({extended:true}));
SERVER.use(BODY_PARSER.json());
SERVER.use(COOKIE_PARSER());

SERVER.use('/api/badges', AUTHENTICATION, BADGE_ROUTER, ERROR_HANDLING);
SERVER.use('/api/users', AUTHENTICATION, USER_ROUTER, ERROR_HANDLING);
SERVER.use('/api/exercisesSheet', AUTHENTICATION, EXERCISE_SHEET_ROUTER, ERROR_HANDLING);
SERVER.use('/api/dailyScores', AUTHENTICATION, DAY_SCORE_ROUTER, ERROR_HANDLING);
SERVER.use('/api/auth', AUTH_ROUTER, ERROR_HANDLING);
SERVER.use('/api/gymPals', AUTHENTICATION, GYM_PALS_ROUTER, ERROR_HANDLING);

SERVER.listen(process.env.PRODUCTION_EXPRESS_PORT, () => {
    console.log(`Express initialized at ${process.env.PRODUCTION_EXPRESS_PORT}`);
});