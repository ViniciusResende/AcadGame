const ExerciseDBAdapter = require('../../adapters/exercise/exerciseDBAdapter');

class QueryExerciseDB {
    async getAllExercises() {
        try {
            let returnExercises = [];
            
            let queriedExercises = await ExerciseDBAdapter.findAllExercises();

            for (const queriedExercise of queriedExercises) {
                returnExercises.push(queriedExercise.dataValues);
            }

            return returnExercises;
        }
        catch (err) {
            return err;
        }
    }

    async getOneExercise(id) {
        try {
            const QUERIED_EXERCISE = await ExerciseDBAdapter.findOneExercise(id);

            return QUERIED_EXERCISE.dataValues;
        } 
        catch (err) {
            return err;
        }
    }
}

module.exports = new QueryExerciseDB;