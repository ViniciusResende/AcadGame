const queryExerciseSheet = require('../../gates/exerciseSheet/exerciseSheetExitGate');

class QueryExerciseSheetDomain {
    async queryUserExerciseSheets(userId) {

        try {
            const USER_EXERCISES = await queryExerciseSheet.getUserExerciseSheets(userId);
        
            const userSheets = USER_EXERCISES.reduce((acc, item) => {
                const currentSheet = item.dataValues.numSheet;

                if(acc[currentSheet])
                    acc[currentSheet].push(item)
                else
                    Object.assign(acc, {...acc, [currentSheet]: [item]})

                return acc;
            }, {})

            // return Object.values(userSheets);
            return userSheets;
        }
        catch(err) {
            throw err;
        }
    }
}

module.exports = new QueryExerciseSheetDomain;