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

SERVER.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Express initialized at ${process.env.EXPRESS_PORT}`);
});