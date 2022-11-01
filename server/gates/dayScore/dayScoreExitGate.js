const DayScoreDBAdapter = require('../../adapters/dayScore/dayScoreDBAdapter');
const { addDays } = require('date-fns');

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

            let currentDate = startDate;

            let dayScores = [];
            for (let index = 0; index < 8; index++) {
                let currentDateString = currentDate.toLocaleDateString("sv", {timezone: "America/Sao_Paulo"});
                dayScores[index] = {
                    'date': currentDateString,
                    'score': 0
                };

                currentDate = addDays(currentDate, 1);
            }

            DAY_SCORES.forEach(dayScore => {
                const dayScoreDate = dayScore.dataValues.date.getDate();
                const dayScoreIndex = dayScoreDate - startDate.getDate();

                
                dayScores[dayScoreIndex].score = dayScore.dataValues.score;
            });

            return dayScores;
        }
        catch(err) {
            throw err;
        }
    }

    async postDailyScore(userId, date, score) {
        try {
            let newDailyScore = new Object;

            newDailyScore['userId'] = userId;
            newDailyScore['date'] = date;
            newDailyScore['score'] = score;

            await DayScoreDBAdapter.newDailyScore(newDailyScore);
        }  
        catch(err) {
            throw err;
        }
    }
}

module.exports = new QueryDayScore;