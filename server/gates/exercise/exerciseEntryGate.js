const queryExerciseDomain = require('../../domains/exercise/exerciseDomain');

class QueryExercise {
    async searchAllExercises() {
        try {
            return await queryExerciseDomain.queryAllExercises();
        }
        catch(err) {
            return err;
        }
    }

    async getOneExercise(id) {
        try {
            return await queryExerciseDomain.queryOneExercise(id);
        }
        catch(err) {
            return err;
        }
    }
}

module.exports = new QueryExercise;