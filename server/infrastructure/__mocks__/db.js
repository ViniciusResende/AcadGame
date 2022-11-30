require('dotenv').config({path:__dirname+'/../.env'})
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.TEST_DB_NAME,
    process.env.TEST_DB_USER,
    process.env.TEST_DB_PASSWORD || "",
    {
        host: process.env.TEST_DB_HOST,
        port: process.env.TEST_PORT,
        dialect: process.env.TEST_DB_DIALECT,
        timezone: '-03:00',
    },
);

const checkConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Test database connected successfully!');
    } catch (error) {
        console.error('Unable to connect to the test database due to: \n', error);
    }
};

checkConnection();

module.exports = sequelize;