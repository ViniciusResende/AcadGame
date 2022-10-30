const DayScoreDBAdapter = require('../../adapters/dayScore/dayScoreDBAdapter');

class QueryDayScore {
    async getUserDayScores(userId) {
        try {
            const QUERIED_DAY_SCORES = await DayScoreDBAdapter.findUserDayScores(userId);

            let returnValues = [];

            QUERIED_DAY_SCORES.forEach(queriedDayScore => {
                returnValues.push(queriedDayScore).dataValues;
            });
            
            return returnValues;
        }
        catch(err) {
            throw err;
        }
    }

    async getDaysScoresInInterval(userId, startDate, endDate) {
        try {
            const DAY_SCORES = await DayScoreDBAdapter.findUserDayScoresInInterval(userId, startDate, endDate);

            let dayScores = [];
            for (let index = 0; index < 8; index++) {
                dayScores[index] = 0;
            }

            DAY_SCORES.forEach(dayScore => {
                const dayScoreDate = dayScore.dataValues.date.getDate();
                const dayScoreIndex = dayScoreDate - startDate.getDate();

                
                dayScores[dayScoreIndex] = dayScore.dataValues.score;
            });

            return dayScores;
        }
        catch(err) {
            throw err;
        }
    }
}

module.exports = new QueryDayScore;