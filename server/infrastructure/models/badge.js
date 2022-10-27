const database = require('../db');
const Sequelize = require('sequelize');

const Badge = database.define('Badges', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    icon: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    unlockScore: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Badge.sync({
    alter: false,
    force: false
}).then(() => {
    console.log('Badge table was (re)created');
}).catch((err) => {
    console.log(err)
});

module.exports = Badge;