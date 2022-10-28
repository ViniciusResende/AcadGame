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

    async createUserExercise(userExerciseInfo) { 
        try {
            await queryExerciseSheet.postUserExercise(userExerciseInfo);
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