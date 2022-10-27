const Express = require('express');
const server = Express();

const BADGE_ROUTER = require('./adapters/badge/badgeRoute');
const EXERCISE_ROUTER = require('./adapters/exercise/exerciseRoute');
const USER_ROUTER = require('./adapters/user/userRoute');
const EXERCISE_SHEET_ROUTER = require('./adapters/exerciseSheet/exerciseSheetRouter');

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

server.use(Express.json());
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());
server.use(cookieParser());

server.use('/badges', BADGE_ROUTER);
server.use('/exercises', EXERCISE_ROUTER);
server.use('/users', USER_ROUTER);
server.use('/exercise-sheets', EXERCISE_SHEET_ROUTER);

server.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Express initialized at ${process.env.EXPRESS_PORT}`);
});