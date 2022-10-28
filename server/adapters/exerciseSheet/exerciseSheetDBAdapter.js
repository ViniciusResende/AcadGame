const EXERCISE_SHEET = require('../../infrastructure/models/exerciseSheet');

class ExerciseSheetDatabaseAdapter {
    unnecessaryAttributes = ['createdAt', 'updatedAt'];

    async findUserExerciseSheets(userId) {
        try {
            const QUERIED_USER_EXERCISES = await EXERCISE_SHEET.findAll({
                where: {
                    UserId: userId
                },
                attributes: {
                    exclude: this.unnecessaryAttributes
                }
            });

            if(!QUERIED_USER_EXERCISES) {
                throw new Error(`Não encontramos fichas de exercícios para o usuário com id ${userId}`);
            }

            return QUERIED_USER_EXERCISES;
        }
        catch(err) {
            throw err;
        }
    }

    async newUserExercise(userExerciseInfo) {
        try {
            await EXERCISE_SHEET.create(userExerciseInfo);
        }
        catch(err) {
            throw err;
        }
    }
}

module.exports = new ExerciseSheetDatabaseAdapter;