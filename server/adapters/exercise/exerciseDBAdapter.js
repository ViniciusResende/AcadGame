const EXERCISE = require('../../infrastructure/models/exercise');

class ExerciseDatabaseAdapter {
    async findAllExercises() {
        try {
            const ALL_EXERCISES = await EXERCISE.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            });

            return ALL_EXERCISES;
        }
        catch(err) {
            return err;
        }
    }

    async findOneExercise(id) {
        try {
            const QUERIED_EXERCISE = await EXERCISE.findByPk(id, {
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            });

            if (!QUERIED_EXERCISE) {
                throw new Error(`Não encontramos um exercício com id ${id}`);
            }

            return QUERIED_EXERCISE;
        }
        catch (err) {
            return err;
        }
    }
};

module.exports = new ExerciseDatabaseAdapter;