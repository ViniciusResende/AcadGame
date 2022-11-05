const sequelize = require('../../infrastructure/db');
const DAY_SCORE = require('../../infrastructure/models/dayScore');
const { Op } = require('sequelize');

class DayScoreDatabaseAdapter {
    unnecessaryAttributes = ['createdAt', 'updatedAt'];

    async findAllDailyScores() {
        try {
            const QUERIED_DAILY_SCORES = await DAY_SCORE.findAll({
                attributes: [
                    'userId',
                    'date',
                    [sequelize.fn('WEEK', sequelize.col('date')), 'week'],
                    [sequelize.fn('YEAR', sequelize.col('date')), 'year'],
                    'score',
                ], 
                order: [
                    ['score', 'DESC']
                ]
            });

            if(!QUERIED_DAILY_SCORES) {
                throw new Error (`Não encontramos pontuações diárias.`);
            }

            return QUERIED_DAILY_SCORES;
        }
        catch(err) {
            throw err;
        }
    }

    async findUserDayScores(userId) {
        try {
            const QUERIED_DAY_SCORES = await DAY_SCORE.findAll({
                where: {
                    userId: userId
                },
                attributes: [
                    'userId',
                    'date',
                    [sequelize.fn('WEEK', sequelize.col('date')), 'week'],
                    [sequelize.fn('YEAR', sequelize.col('date')), 'year'],
                    'score',
                ],
                order: [
                    ['date', 'DESC']
                ]
            });

            if(!QUERIED_DAY_SCORES) {
                throw new Error (`Não encontramos pontuações diárias para o usuário com id ${userId}`);
            }

            return QUERIED_DAY_SCORES;
        }
        catch(err) {
            throw err;
        }
    }

    async findUserDayScoresInInterval(userId, startDate, endDate) {
        try {
            const QUERIED_DAY_SCORES = await DAY_SCORE.findAll({
                where: {
                    userId: userId,
                    date: {
                        [Op.between] : [startDate, endDate]
                    }
                },
                attributes: {
                    exclude: this.unnecessaryAttributes
                },
                order: [
                    ['date', 'ASC']
                ]
            });

            return QUERIED_DAY_SCORES;
        }
        catch(err) {
            throw err;
        }
    }

    async newDailyScore(dailyScore) {
        try {
            await DAY_SCORE.create(dailyScore);
        }
        catch(err) {
            throw err;
        }
    }
}

module.exports = new DayScoreDatabaseAdapter;