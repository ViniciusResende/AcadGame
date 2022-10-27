const database = require('../db');
const Sequelize = require('sequelize');

const Exercise = database.define('Exercises', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    type: {
        type: Sequelize.STRING,
        allowNull: true
    },
    isTime: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    isLoad: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    icon: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Exercise.sync({
    alter: false,
    force: false
}).then(() => {
    console.log('Exercise table was (re)created');
}).catch((err) => {
    console.log(err)
});

module.exports = Exercise;