const ExerciseSheetDBAdapter = require('../../adapters/exerciseSheet/exerciseSheetDBAdapter');

class QueryExerciseSheetDB {
    EVERY_USER_EXERCISE_INFO = ['numSheet', 'userId', 'exerciseId', 'load', 'time', 'numRepetitions', 'numSets'];

    USER_EXERCISE_REQUIRED_INFO = ['numSheet', 'userId', 'exerciseId'];

    async getUserExerciseSheets(userId) {
        try {
            const QUERIED_USER_EXERCISES = await ExerciseSheetDBAdapter.findUserExerciseSheets(userId);

            let returnValues = [];

            QUERIED_USER_EXERCISES.forEach(queriedUserExercise => {
                returnValues.push(queriedUserExercise).dataValues;
            });

            return returnValues;
        }
        catch(err) {
            return err;
        }
    }

    async postUserExercise(userExerciseInfo) {
        let newUserExercise = new Object;

        try {
            // userInfo object must contains only valid properties
            Object.keys(userExerciseInfo).forEach(info => {
                if (this.EVERY_USER_EXERCISE_INFO.includes(info)) {
                    newUserExercise[info] = userExerciseInfo[info];
                }
            });

            // verify if no necessary information being left behind
            for(const INFO of this.USER_EXERCISE_REQUIRED_INFO) {
                if(!newUserExercise[INFO]) {
                    throw new Error(`A informação ${INFO} é necessária para concluir o cadastro do exercício de usuário.`)
                }
            }
    
            await ExerciseSheetDBAdapter.newUserExercise(newUserExercise);
        }
        catch(err) {
            throw err;
        }
    }
}

module.exports = new QueryExerciseSheetDB;