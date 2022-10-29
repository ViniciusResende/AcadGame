const queryExerciseSheet = require('../../gates/exerciseSheet/exerciseSheetExitGate');

class QueryExerciseSheetDomain {
    async queryUserExerciseSheets(userId) {
        try {
            const USER_EXERCISES = await queryExerciseSheet.getUserExerciseSheets(userId);
        
            const userSheets = USER_EXERCISES.reduce((acc, item) => {
                const currentSheet = item.dataValues.sheetId;
                delete item.dataValues.id;
                delete item.dataValues.sheetId;
                delete item.dataValues.userId;

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

    async updateUserExerciseInfo(userExerciseId, userExerciseInfo) {
        try {
            await queryExerciseSheet.putUserExercise(userExerciseId, userExerciseInfo);
        }
        catch(err) {
            throw err;
        }
    }

    async deleteUserExercise(userExerciseId) {
        try {
            await queryExerciseSheet.deleteUserExercise(userExerciseId);
        }
        catch(err) {
            throw err;
        }
    }
}

module.exports = new QueryExerciseSheetDomain;