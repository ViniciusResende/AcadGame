const queryExercises = require('../../gates/exercise/exerciseExitGate');

class QueryExerciseDomain {
    async queryAllExercises() {
        try {
            const EXERCISES = await queryExercises.getAllExercises();

            return EXERCISES;
        }
        catch(err) {
            throw err;
        }
    }

    async queryOneExercise(id) {
        try {
            const EXERCISE = await queryExercises.getOneExercise(id);

            return EXERCISE;
        }
        catch (err) {
            throw err;
        }
    }

    async queryExercisesByType(type) {
        try {
            const EXERCISES = await queryExercises.getExerciseByType(type);

            return EXERCISES;
        }
        catch(err) {
            throw err;
        }
    }

    async queryExercisesByName(name) {
        try {
            const EXERCISES = await queryExercises.getExercisesByName(name);

            return EXERCISES;
        }
        catch(err) {
            throw err;
        }
    }
}

module.exports = new QueryExerciseDomain;