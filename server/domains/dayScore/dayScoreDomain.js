const QueryDayScore = require('../../gates/dayScore/dayScoreExitGate');

class DayScore {
    async getUserDayScores(userId) {
        try {
            const QUERIED_DAY_SCORES = await QueryDayScore.getUserDayScores(userId);

            return QUERIED_DAY_SCORES;
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = new DayScore;