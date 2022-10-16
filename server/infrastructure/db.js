require('dotenv').config({path:__dirname+'/.env'})
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD || "",
    {
        host: process.env.DB_HOST,
        port: process.env.PORT,
        dialect: process.env.DB_DIALECT,
        timezone: '-03:00',
    },
);

module.exports = sequelize;