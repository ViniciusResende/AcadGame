const database = require('../db');
const Sequelize = require('sequelize');

const User = database.define('Users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nickName: {
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
        allowNull: false
    }
});

User.sync({
    alter: false,
    force: false
}).then( () => {
    console.log('User table was (re)created');
}).catch(err => {
    console.log(err);
});

module.exports = User;