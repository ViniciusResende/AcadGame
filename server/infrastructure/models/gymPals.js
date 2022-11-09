const database = require('../db');
const Sequelize = require('sequelize');

const GymPals = database.define('GymPals', {
    friendshipId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    senderId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    receiverId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    accepted: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

GymPals.sync({
    alter: false,
    force: false
}).then(() => {
    console.log('GymPals table was (re)created');
}).catch((err) => {
    console.log(err.message);
});

module.exports = GymPals;