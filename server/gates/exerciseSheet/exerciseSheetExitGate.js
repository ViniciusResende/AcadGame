const ExerciseSheetDBAdapter = require('../../adapters/exerciseSheet/exerciseSheetDBAdapter');

class QueryExerciseSheetDB {
    EVERY_USER_EXERCISE_INFO = ['sheetId', 'userId', 'exerciseId', 'load', 'time', 'numRepetitions', 'numSets', 'isLoad'];
    LOAD_USER_EXERCISE_INFO = ['load', 'numSets', 'numRepetitions'];
    TIME_USER_EXERCISE_INFO = ['time', 'numSets'];

    USER_EXERCISE_REQUIRED_INFO = ['sheetId', 'userId', 'exerciseId', 'isLoad'];

    async getUserExerciseSheets(userId) {
        try {
            const QUERIED_USER_EXERCISES = await ExerciseSheetDBAdapter.findUserExerciseSheets(userId);
            let exerciseIds = [];
            for(const QUERIED_USER_EXERCISE of QUERIED_USER_EXERCISES) {
                exerciseIds.push(QUERIED_USER_EXERCISE.dataValues.exerciseId);
            }

            let queriedExerciseNames = new Object;
            for(const EXERCISE_ID of exerciseIds) {
                const QUERIED_EXERCISE = await ExerciseSheetDBAdapter.findOneExercise(EXERCISE_ID);
                queriedExerciseNames[EXERCISE_ID] = QUERIED_EXERCISE.dataValues.name;
            }

            let returnValues = [];

            for(const QUERIED_USER_EXERCISE of QUERIED_USER_EXERCISES) {
                const QUERIED_EXERCISE_ID = QUERIED_USER_EXERCISE.dataValues.exerciseId;
                QUERIED_USER_EXERCISE.dataValues['name'] = queriedExerciseNames[QUERIED_EXERCISE_ID];
                returnValues.push(QUERIED_USER_EXERCISE).dataValues;
            }

            return returnValues;
        }
        catch(err) {
            throw err;
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
            throw err;
        }
    }

    async postUserExercises(userId, sheetId, exerciseIds) {
        try {
            const QUERIED_EXERCISES = []
            for(const exerciseId of exerciseIds) {
                const QUERIED_EXERCISE = await ExerciseSheetDBAdapter.findOneExercise(exerciseId);
                QUERIED_EXERCISES.push(QUERIED_EXERCISE);
            }
            
            let count = 0;
            let userExercises = [];
            
            exerciseIds.forEach(exerciseId => {
                let newUserExercise = new Object;
                const EXERCISE_IS_LOAD = QUERIED_EXERCISES[count].dataValues.isLoad;
                
                this.EVERY_USER_EXERCISE_INFO.forEach(info => {
                    newUserExercise[info] = null;
                });

                if(EXERCISE_IS_LOAD) {
                    this.LOAD_USER_EXERCISE_INFO.forEach(info => {
                        newUserExercise[info] = 0;
                    });
                } 
                else {
                    this.TIME_USER_EXERCISE_INFO.forEach(info => {
                        newUserExercise[info] = 0;
                    });
                }

                newUserExercise['userId'] = userId;
                newUserExercise['sheetId'] = sheetId;
                newUserExercise['exerciseId'] = exerciseId;
                newUserExercise['isLoad'] = EXERCISE_IS_LOAD;

                userExercises.push(newUserExercise);
                count += 1;
            });

            await ExerciseSheetDBAdapter.newUserExercises(userExercises);
        }
        catch(err) {
            throw err;
        }
    }

    async putUserExercise(userExerciseIds, userExerciseInfo) {
        try {
            if(Object.keys(userExerciseInfo).length === 0) {
                throw new Error('É necessário fornecer as alterações desejadas.');
            }

            Object.keys(userExerciseInfo).forEach((info) => {
                if(!this.EVERY_USER_EXERCISE_INFO.includes(info)) {
                    delete userExerciseInfo[info];
                }
            });

            const UPDATE_USER_EXERCISE = await ExerciseSheetDBAdapter.updateUserExercise(userExerciseIds, userExerciseInfo);

            return UPDATE_USER_EXERCISE;
        }
        catch(err) {
            throw err;
        }
    }

    async deleteUserExercise(userExerciseIds) {
        try {
            await ExerciseSheetDBAdapter.eraseUserExercise(userExerciseIds);
        }
        catch(err) {
            throw err;
        }
    }
}

module.exports = new QueryExerciseSheetDB;