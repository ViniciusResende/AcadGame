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

            const LAST_7_DAY_SCORES = await QueryDayScore.getDaysScoresInInterval(userId, ONE_WEEK_AGO, today);

            return LAST_7_DAY_SCORES;
        }
        catch(err) {
            throw err;
        }
    }

    async createDailyScore(userId, sentExercisesInfo) {
        try {
            const TODAY = new Date();
            let score = 0;

            // TODO: improve the score increase business rule 
            sentExercisesInfo.forEach(sentExerciseInfo => {
                let numRepetitions = sentExerciseInfo.numRepetitions;
                let numSets = sentExerciseInfo.numSets;
                let time = sentExerciseInfo.time;

                if(sentExerciseInfo.isLoad)
                    score += numRepetitions * numSets;
                else
                    score += 30;
            });

            await QueryDayScore.postDailyScore(userId, TODAY, score);
        }
        catch(err) {
            throw err;
        }
    }

    async getWeekPodium() {
        try {
            let currentDate = new Date();
            let startDate = new Date(currentDate.getFullYear(), 0, 1);

            var days = Math.floor((currentDate - startDate) /
            (24 * 60 * 60 * 1000));

            var currentWeekNumber = Math.ceil(days / 7);
            var currentYear = currentDate.getFullYear();
            
            let weekPodium = await QueryDayScore.getWeekPodium(currentYear, currentWeekNumber);

            function compare(a, b) {
                if (a.score < b.score)
                  return 1;

                if (a.score > b.score)
                  return -1;
                
                return 0;
            }

            weekPodium.sort(compare);

            return weekPodium;
        }
        catch(err) {
            throw err;
        }
    }
}

module.exports = new DayScore;