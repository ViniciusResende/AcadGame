const Express = require('express');
const server = Express();

const BadgeRouter = require('./routes/badge/badgeRoute');

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

server.use(Express.json());
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());
server.use(cookieParser());

server.use('/badges', BadgeRouter);

server.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Express initialized at ${process.env.EXPRESS_PORT}`);
});