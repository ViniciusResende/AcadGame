const Express = require('express');
const server = Express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

server.use(Express.json());
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());
server.use(cookieParser());

// IIF (Immediately Invoked Function) to test the database and "Contracts" table creation.
(async() => {
    const BADGE = require('./infrastructure/models/badge');
})();

server.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Express initialized at ${process.env.EXPRESS_PORT}`);
});