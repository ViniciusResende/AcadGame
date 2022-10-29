const { all } = require('../../adapters/badge/badgeRoute');
const ExerciseSheetDBAdapter = require('../../adapters/exerciseSheet/exerciseSheetDBAdapter');

class QueryExerciseSheetDB {
    EVERY_USER_EXERCISE_INFO = ['sheetId', 'userId', 'exerciseId', 'load', 'time', 'numRepetitions', 'numSets'];

    USER_EXERCISE_REQUIRED_INFO = ['sheetId', 'userId', 'exerciseId'];

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

    async getAvailableExercisesSheet(userId, sheetId) {
        try {
            const RETURNED_VALUES = await ExerciseSheetDBAdapter.findAvailableExercisesSheet(userId, sheetId);

            let unavailableExercisesSheetIds = [];
            let allExercises = [];
            let returnValues = [];

            RETURNED_VALUES[0].forEach(exerciseSheet => {
                unavailableExercisesSheetIds.push(exerciseSheet.dataValues.exerciseId);
            });
            
            RETURNED_VALUES[1].forEach(exercise => {
                allExercises.push(exercise).dataValues;
            })

            returnValues.push(unavailableExercisesSheetIds);
            returnValues.push(allExercises);

            return returnValues;
        }
        catch(err) {
            return err;
        }
    }

    async postUserExercises(userExercisesInfo) {
        let userExercises = [];

        try {
            // userInfo object must contains only valid properties
            userExercisesInfo.forEach(userExerciseInfo => {
                let newUserExercise = new Object;
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

                userExercises.push(newUserExercise);
            });
    
            await ExerciseSheetDBAdapter.newUserExercises(userExercises);
        }
        catch(err) {
            throw err;
        }
    }

    async putUserExercise(userExerciseId, userExerciseInfo) {
        try {
            if(Object.keys(userExerciseInfo).length === 0) {
                throw new Error('É necessário fornecer as alterações desejadas.');
            }

            Object.keys(userExerciseInfo).forEach((info) => {
                if(!this.EVERY_USER_EXERCISE_INFO.includes(info)) {
                    throw new Error(`A propriedade ${info} não é válida.`);
                }
            });

            await ExerciseSheetDBAdapter.updateUserExercise(userExerciseId, userExerciseInfo);
        }
        catch(err) {
            throw err;
        }
    }

    async deleteUserExercise(userExerciseId) {
        try {
            await ExerciseSheetDBAdapter.eraseUserExercise(userExerciseId);
        }
        catch(err) {
            throw err;
        }
    }
}

module.exports = new QueryExerciseSheetDB;