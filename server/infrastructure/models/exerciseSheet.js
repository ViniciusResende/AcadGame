const database = require('../db');
const Sequelize = require('sequelize');
const User = require('./user');
const Exercise = require('./exercise');

const ExerciseSheet = database.define('ExerciseSheets', {
    sheetId: {
        type:Sequelize.INTEGER,
        allowNull: false
    },
    userId: {
        type:Sequelize.INTEGER,
        allowNull: false
    },
    exerciseId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    load: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    time: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    numRepetitions: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    numSets: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    isLoad: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true 
    }
}); 

// User.belongsToMany(Exercise, { through: ExerciseSheet });
// Exercise.belongsToMany(User, { through: ExerciseSheet });

ExerciseSheet.sync({alter: false, force: false})
    .then(() => {
        console.log('ExerciseSheet table was (re)created');
    })
    .catch((err) => console.log(err));

module.exports = ExerciseSheet;