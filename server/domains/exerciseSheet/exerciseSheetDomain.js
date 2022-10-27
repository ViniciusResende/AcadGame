const queryExerciseSheet = require('../../gates/exerciseSheet/exerciseSheetExitGate');

class QueryExerciseSheetDomain {
    async queryUserExerciseSheets(userId) {
        let queriedUserExercises = [];
        let exerciseSheet1 = [];
        let exerciseSheet2 = [];
        let exerciseSheet3 = [];
        let exerciseSheet4 = [];
        let exerciseSheet5 = [];


        try {
            const USER_EXERCISES = await queryExerciseSheet.getUserExerciseSheets(userId);

            USER_EXERCISES.forEach(USER_EXERCISE => {
                queriedUserExercises.push(USER_EXERCISE);
            });

            return queriedUserExercises;
        }
        catch(err) {
            throw err;
        }
    }
}

module.exports = new QueryExerciseSheetDomain;