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
            return err;
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
            return err;
        }
    }
}

module.exports = new QueryExerciseDomain;