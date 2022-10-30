const { addDays } = require('date-fns');
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

    async getLast7DaysScores(userId) {
        try {
            let today = new Date();
            today.setHours(23);
            today.setMinutes(59);
            today.setSeconds(59);
            const ONE_WEEK_AGO = addDays(today, -7);

            const LAST_7_DAY_SCORES = QueryDayScore.getDaysScoresInInterval(userId, ONE_WEEK_AGO, today);

            return LAST_7_DAY_SCORES;
        }
        catch(err) {
            throw err;
        }
    }
}

module.exports = new DayScore;