const sequelize = require('../../infrastructure/db');
const DAY_SCORE = require('../../infrastructure/models/dayScore');

class DayScoreDatabaseAdapter {
    unnecessaryAttributes = ['createdAt', 'updatedAt'];

    async findUserWeeklyScores(userId) {
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
                    'score'
                ]
            });

            if(!QUERIED_DAY_SCORES) {
                throw new Error (`Não encontramos fichas de exercícios para o usuário com id ${userId}`);
            }

            return QUERIED_DAY_SCORES;
        }
        catch(err) {
            throw err;
        }
    }
}

module.exports = new DayScoreDatabaseAdapter;