const queryExerciseSheet = require('../../gates/exerciseSheet/exerciseSheetExitGate');

class QueryExerciseSheetDomain {
    async queryUserExerciseSheets(userId) {
        try {
            const USER_EXERCISES = await queryExerciseSheet.getUserExerciseSheets(userId);

            const userSheets = {
                1: [],
                2: [],
                3: [],
                4: [],
                5: []
            }

            USER_EXERCISES.forEach(userExercise => {
                const currentSheet = userExercise.dataValues.sheetId;
                delete userExercise.dataValues.id;
                delete userExercise.dataValues.sheetId;
                delete userExercise.dataValues.userId;

                userSheets[currentSheet].push(userExercise);
            });

            return userSheets;
        }
        catch(err) {
            throw err;
        }
    }

    async queryAvailableExercisesSheet(userId, sheetId, type) {
        try {
            const RETURNED_VALUES = await queryExerciseSheet.getAvailableExercisesSheet(userId, sheetId);
            const UNAVAILABLE_EXERCISES_SHEET_IDS = RETURNED_VALUES[0];
            const ALL_EXERCISES = RETURNED_VALUES[1];
            
            let availableExercises = [];

            ALL_EXERCISES.forEach(exercise => {
                const EXERCISE_ID = exercise.dataValues.id;
                const EXERCISE_TYPE = exercise.dataValues.type;
                
                if(!UNAVAILABLE_EXERCISES_SHEET_IDS.includes(EXERCISE_ID)) {
                    if(type === undefined || EXERCISE_TYPE == type) 
                        availableExercises.push(exercise);
                }
            });

            return availableExercises;
        }
        catch(err) {
            throw err;
        }
    }

    async createUserExercises(userId, sheetId, exercisesIds) { 
        try {
            await queryExerciseSheet.postUserExercises(userId, sheetId, exercisesIds);
        }
        catch(err) {
            throw err;
        }
    }

    async updateUserExerciseInfo(userExerciseIds, userExerciseInfo) {
        try {
            const UPDATE_USER_EXERCISE = await queryExerciseSheet.putUserExercise(userExerciseIds, userExerciseInfo);
            return UPDATE_USER_EXERCISE;
        }
        catch(err) {
            throw err;
        }
    }

    async deleteUserExercise(userExerciseIds) {
        try {
            await queryExerciseSheet.deleteUserExercise(userExerciseIds);
        }
        catch(err) {
            throw err;
        }
    }
}

module.exports = new QueryExerciseSheetDomain;