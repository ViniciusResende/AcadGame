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
        catch(err) {
            return err;
        }
    }

    async getExerciseByType(type) {
        try {
            const QUERIED_EXERCISES = await ExerciseDBAdapter.findExerciseByType(type);

            let returnValues = [];
            QUERIED_EXERCISES.forEach(queriedExercise => {
                returnValues.push(queriedExercise).dataValues;
            });

            return returnValues;
        }
        catch(err) {
            return err;
        }
    }

    async getExercisesByName(name) {
        try {
            const QUERIED_EXERCISES = await ExerciseDBAdapter.findExercisesByName(name);

            let returnValues = [];
            QUERIED_EXERCISES.forEach(queriedExercise => {
                returnValues.push(queriedExercise).dataValues;
            });
            
            return returnValues;
        }
        catch(err) {
            throw err;
        }
    }
}

module.exports = new QueryExerciseDB;