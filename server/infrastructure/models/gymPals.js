const database = require('../db');
const Sequelize = require('sequelize');

const GymPals = database.define('GymPals', {

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