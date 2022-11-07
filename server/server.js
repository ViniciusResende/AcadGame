const Express = require('express');
const cors = require('cors');
const server = Express();

const BADGE_ROUTER = require('./adapters/badge/badgeRoute');
const USER_ROUTER = require('./adapters/user/userRoute');
const AUTH_ROUTER = require('./adapters/authentication/authRoute');
const EXERCISE_SHEET_ROUTER = require('./adapters/exerciseSheet/exerciseSheetRouter');
const DAY_SCORE_ROUTER = require('./adapters/dayScore/dayScoreRouter');

const AUTHENTICATION = require('./utils/authMiddleware');
const ERROR_HANDLING = require('./utils/errorMiddleware');

const IS_AUTHENTICATED = require('./domains/authentication/authDomain').isLoggedIn;

server.use(cors());
server.use(Express.json());
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());
server.use(cookieParser());

server.use('/api/badges', AUTHENTICATION, BADGE_ROUTER, ERROR_HANDLING);
server.use('/api/users', AUTHENTICATION, USER_ROUTER, ERROR_HANDLING);
server.use('/api/exercisesSheet', AUTHENTICATION, EXERCISE_SHEET_ROUTER, ERROR_HANDLING);
server.use('/api/dailyScores', AUTHENTICATION, DAY_SCORE_ROUTER, ERROR_HANDLING);
server.use('/api/auth', AUTH_ROUTER, ERROR_HANDLING);

const errorHandler = (err, req, res, next) => {
    res.status(500).send(err.message);
}


SERVER.use(EXPRESS.json());
SERVER.use(BODY_PARSER.urlencoded({extended:true}));
SERVER.use(BODY_PARSER.json());
SERVER.use(COOKIE_PARSER());

SERVER.use('/badges', IS_AUTHENTICATED, BADGE_ROUTER, errorHandler);
SERVER.use('/exercises', IS_AUTHENTICATED, EXERCISE_ROUTER, errorHandler);
SERVER.use('/users', USER_ROUTER, errorHandler);
SERVER.use('/auth', AUTH_ROUTER, errorHandler);

SERVER.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Express initialized at ${process.env.EXPRESS_PORT}`);
});