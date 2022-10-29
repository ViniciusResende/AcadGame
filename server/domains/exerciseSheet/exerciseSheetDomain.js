const { deleteUserExercise } = require('../../gates/exerciseSheet/exerciseSheetExitGate');
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

    async queryOneExerciseSheet(userId, numSheet) {
        try {
            const USER_EXERCISES = await queryExerciseSheet.getOneExerciseSheet(userId, numSheet);

            const USER_SHEET = [];

            USER_EXERCISES.forEach(userExercise => {
                USER_SHEET.push(userExercise);
            });

            return USER_SHEET;
        }
        catch(err) {

        }
    }

    async createUserExercises(userExercisesInfo) { 
        try {
            await queryExerciseSheet.postUserExercises(userExercisesInfo);
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