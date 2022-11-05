const EXERCISE_SHEET = require('../../infrastructure/models/exerciseSheet');
const EXERCISE = require('../../infrastructure/models/exercise');

class ExerciseSheetDatabaseAdapter {
    unnecessaryAttributes = ['createdAt', 'updatedAt'];

    async findOneExercise(id) {
        try {
            const QUERIED_EXERCISE = await EXERCISE.findOne({
                where: {
                    id: id
                },
                attributes: {
                    exclude: this.unnecessaryAttributes
                }
            });

            if(!QUERIED_EXERCISE) {
                throw new Error(`Não encontramos o exercício id ${id}`);
            }

            return QUERIED_EXERCISE;
        }
        catch(err) {
            return err;
        }
    }

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

    async findAvailableExercisesSheet(userId, sheetId) {
        try {
            const UNAVAILABLE_EXERCISES_SHEET = await EXERCISE_SHEET.findAll({
                where: {
                    userId: userId,
                    sheetId: sheetId
                },
                attributes: {
                    exclude: this.unnecessaryAttributes
                }
            });

            const ALL_EXERCISES = await EXERCISE.findAll({
                attributes: {
                    exclude: this.unnecessaryAttributes
                }
            })
            
            return [UNAVAILABLE_EXERCISES_SHEET, ALL_EXERCISES];
        }
        catch(err) {
            throw err;
        }
    }

    async newUserExercises(userExercises) {
        try {
            for(const userExercise of userExercises) {
                await EXERCISE_SHEET.create(userExercise);
            }
        }
        catch(err) {
            throw err;
        }
    }

    async updateUserExercise(userExerciseIds, userExerciseInfo) {
        try {
            let updateUserExercise = await EXERCISE_SHEET.findOne({
                where: {
                    sheetId: userExerciseIds['sheetId'],
                    userId: userExerciseIds['userId'],
                    exerciseId: userExerciseIds['exerciseId']
                }
            });

            if(updateUserExercise == null) {
                throw new Error(`O exercício de usuário com sheetId: ${userExerciseIds['sheetId']}, userId: ${userExerciseIds['userId']}, e exerciseId: ${userExerciseIds['exerciseId']} não existe.`);
            }

            Object.keys(userExerciseInfo).forEach(async (info) => {
                updateUserExercise[info] = userExerciseInfo[info];
            });

            updateUserExercise.save({
                fields: Object.keys(userExerciseInfo)
            });

            return updateUserExercise;
        }
        catch(err) {
            throw err;
        }
    } 

    async eraseUserExercise(userExerciseIds) {
        try {
            await EXERCISE_SHEET.destroy({
                where: {
                    sheetId: userExerciseIds['sheetId'],
                    userId: userExerciseIds['userId'],
                    exerciseId: userExerciseIds['exerciseId']
                }
            });
        }
        catch(err) {
            throw err;
        }
    }
}

module.exports = new ExerciseSheetDatabaseAdapter;