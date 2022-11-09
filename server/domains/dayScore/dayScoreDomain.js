const { addDays } = require('date-fns');
const QueryDayScore = require('../../gates/dayScore/dayScoreExitGate');
const userDomain = require('../../domains/user/userDomain'); 

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
 
            sentExercisesInfo.forEach(sentExerciseInfo => {
                let numRepetitions = sentExerciseInfo.numRepetitions;
                let numSets = sentExerciseInfo.numSets;

                if(sentExerciseInfo.isLoad)
                    score += numRepetitions * numSets;
                else
                    score += 40;
            });

            await QueryDayScore.postDailyScore(userId, TODAY, score);

            const user = await userDomain.getSingleUser(userId);
            const totalScore = user.dataValues.score + score;

            await userDomain.updateUserInfo(userId, { score: totalScore });
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

    async getUserWeeklyRank(userId) {
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

            const first = weekPodium[0];

            let totalScore = 0;
            let numUsers = 0;
            weekPodium.forEach(user => {
                numUsers++;
                totalScore += user.score;
            });
            const averageScore = totalScore / numUsers;

            const userIndex = weekPodium.findIndex(element => element.userId === userId);
            let user = weekPodium[userIndex];
            const userRank = userIndex;
            user['userRank'] = userRank;

            return {
                first: first,
                averageScore: averageScore,
                user: user
            }
        }
        catch(err) {
            throw err;
        }
    }
}

module.exports = new DayScore;