const queryExercises = require('../../gates/exercise/exerciseExitGate');

class QueryExerciseDomain {
    async queryAllExercises() {
        let queriedExercises = [];

        try {
            const exercises = await queryExercises.getAllExercises();

            for (const exercise of exercises) {
                queriedExercises.push(exercise);
            }

            return queriedExercises;
        }
        catch(err) {
            throw err;
        }
    }

    async queryOneExercise(id) {
        let queriedExercises = [];

        try {
            const EXERCISE = await queryExercises.getOneExercise(id);

            queriedExercises.push(EXERCISE);

            return queriedExercises;
        }
        catch (err) {
            throw err;
        }
    }

    async queryExercisesByType(type) {
        let queriedExercises = [];

        try {
            const EXERCISES = await queryExercises.getExerciseByType(type);

            for(const EXERCISE of EXERCISES) {
                queriedExercises.push(EXERCISE);
            }


            return queriedExercises;
        }
        catch(err) {
            throw err;
        }
    }

    async queryExercisesByName(name) {
        let queriedExercises = [];

        try {
            const EXERCISES = await queryExercises.getExercisesByName(name);

            EXERCISES.forEach(EXERCISE => {
                queriedExercises.push(EXERCISE);
            });

            return EXERCISES;
        }
        catch(err) {
            throw err;
        }
    }
}

module.exports = new QueryExerciseDomain;