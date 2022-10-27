const Router = require('express').Router();

const QueryExercise = require('../../domains/exercise/exerciseDomain');

Router.get('/', async (req, res) => {
    try {
        const EXERCISES = await QueryExercise.queryAllExercises();

        res.status(200).json(EXERCISES);
    }
    catch(err) {
        res.status(500).send(err);
    }
});

Router.get('/id/:id', async (req, res) => {
    try {
        const EXERCISE = await QueryExercise.queryOneExercise(req.params.id);

        res.status(200).json(EXERCISE);
    }
    catch(err) {
        res.status(500).send(err);
    }
});

Router.get('/type/:type', async (req, res) => {
    try {
        const TYPE = req.params.type;
        const EXERCISES = await QueryExercise.queryExercisesByType(TYPE);

        res.status(200).json(EXERCISES);
    }
    catch(err) {
        res.status(500).send(err);
    }
});

Router.get('/name/:name', async (req, res) => {
    try {
        const NAME = req.params.name;
        const EXERCISES = await QueryExercise.queryExercisesByName(NAME);

        res.status(200).json(EXERCISES);
    }
    catch(err) {
        res.status(500).send(err);
    }
})

module.exports = Router;