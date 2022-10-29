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
}

module.exports = new QueryDayScore;