const Express = require('express');
const cors = require('cors');
const server = Express();

const BADGE_ROUTER = require('./adapters/badge/badgeRoute');
const USER_ROUTER = require('./adapters/user/userRoute');
const AUTH_ROUTER = require('./adapters/authentication/authRoute');
const EXERCISE_SHEET_ROUTER = require('./adapters/exerciseSheet/exerciseSheetRouter');
const DAY_SCORE_ROUTER = require('./adapters/dayScore/dayScoreRouter');

const AUTHENTICATION = require('./utils/authMiddleware');

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

server.use(cors());
server.use(Express.json());
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());
server.use(cookieParser());

server.use('/api/badges', AUTHENTICATION, BADGE_ROUTER);
server.use('/api/users', AUTHENTICATION, USER_ROUTER);
server.use('/api/exercisesSheet', AUTHENTICATION, EXERCISE_SHEET_ROUTER);
server.use('/api/dailyScores', AUTHENTICATION, DAY_SCORE_ROUTER);
server.use('/api/auth', AUTH_ROUTER);

server.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Express initialized at ${process.env.EXPRESS_PORT}`);
});