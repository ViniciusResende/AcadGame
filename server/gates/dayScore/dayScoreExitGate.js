const DayScoreDBAdapter = require('../../adapters/dayScore/dayScoreDBAdapter');

class QueryDayScore {
    async getUserDayScores(userId) {
        try {
            const QUERIED_DAY_SCORES = await DayScoreDBAdapter.getUserDayScores(userId);

            

            const allUserDayScores = QUERIED_DAY_SCORES.reduce((acc, item) => {
                const currentYear = item.dataValues.year;
                const currentWeek = item.dataValues.week;

                if(acc[currentYear][currentWeek])
                    acc[currentYear][currentWeek].push(item);
                else if(acc[currentYear])
                    Object.assign(acc, {...acc, [currentYear]: [item]})

                if(acc[current])
            })

            return QUERIED_DAY_SCORES;
        }
        catch(err) {
            throw err;
        }
    }
}

module.exports = new QueryDayScore;