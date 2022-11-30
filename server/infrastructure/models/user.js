const database = require('../db');
const Sequelize = require('sequelize');

const User = database.define('Users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nickname: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    profileIcon: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "default"
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    score: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});

User.sync({
    alter: false,
    force: false
}).then( () => {
    console.log('User table was (re)created');
}).catch(err => {
    /* istanbul ignore next */
    console.log(err);
});

module.exports = User;