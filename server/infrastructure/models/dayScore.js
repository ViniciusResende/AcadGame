const database = require('../db');
const Sequelize = require('sequelize');

const DayScore = database.define('DayScores', {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    date: {
        type: Sequelize.DATE,
        allowNull: true
    },
    score: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});

DayScore.sync({
    alter: false,
    force: false
}).then( () => {
    console.log('DayScore table was (re)created');
}).catch(err => {
    console.log(err);
});