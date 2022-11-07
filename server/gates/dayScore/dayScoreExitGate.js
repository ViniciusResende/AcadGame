const DayScoreDBAdapter = require('../../adapters/dayScore/dayScoreDBAdapter');
const UserDBAdapter = require('../../adapters/user/userDBAdapter');
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
            const USER_DAY_SCORES = await DayScoreDBAdapter.findUserDayScoresInInterval(userId, startDate, endDate);

            let currentDate = startDate;

            let allDayScores = [];
            for (let index = 0; index < 8; index++) {
                let currentDateString = currentDate.toLocaleDateString("sv", {timezone: "America/Sao_Paulo"});
                allDayScores[index] = {
                    'date': currentDateString,
                    'score': 0
                };

                const matches = USER_DAY_SCORES.filter(element => element.dataValues.date.getDate() === currentDate.getDate());
                if(matches) {
                    matches.forEach(match => {
                        allDayScores[index].score += match.dataValues.score;
                    });
                }
                    
                currentDate = addDays(currentDate, 1);
            }
            console.log(allDayScores);

            return allDayScores;
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

    async getWeekPodium(year, weekNumber) {
        try {
            const ALL_DAILY_SCORES = await DayScoreDBAdapter.findAllDailyScores();
            const ALL_USERS = await UserDBAdapter.getEveryUser();

            let usersWeeklyScores = ALL_DAILY_SCORES.reduce((acc, item) => {
                const CURRENT_USER_ID = item.dataValues.userId;
                const CURRENT_YEAR = item.dataValues.year;
                const CURRENT_WEEK = item.dataValues.week;
                const CURRENT_SCORE = item.dataValues.score;
                const CURRENT_USER = ALL_USERS.find(element => element.dataValues.id === CURRENT_USER_ID);
                
                delete item.dataValues.date;
                delete item.dataValues.year;
                delete item.dataValues.week;
                
                item.dataValues['nickname'] = CURRENT_USER.nickname;
                item.dataValues['profileIcon'] = CURRENT_USER.profileIcon;

                if(CURRENT_YEAR === year && CURRENT_WEEK === weekNumber) {
                    if(acc[CURRENT_USER_ID])
                        acc[CURRENT_USER_ID].score += CURRENT_SCORE;
                    else
                        Object.assign(acc, {...acc, [CURRENT_USER_ID]:item.dataValues});
                }

                return acc;
            }, {}); 

            const RETURN_VALUES = Object.values(usersWeeklyScores);

            return RETURN_VALUES;
        }
        catch(err) {
            throw err;
        }
    }
}

module.exports = new QueryDayScore;