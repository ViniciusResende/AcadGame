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

const checkConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully!');
    } catch (error) {
        console.error('Unable to connect to the database due to: \n', error);
    }
};

checkConnection();

module.exports = sequelize;