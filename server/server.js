const Express = require('express');
const server = Express();

const BadgeRouter = require('./adapters/badge/badgeRoute');
const ExerciseRouter = require('./adapters/exercise/exerciseRoute');

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

server.use(Express.json());
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());
server.use(cookieParser());

server.use('/badges', BadgeRouter);
server.use('/exercises', ExerciseRouter);

server.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Express initialized at ${process.env.EXPRESS_PORT}`);
});