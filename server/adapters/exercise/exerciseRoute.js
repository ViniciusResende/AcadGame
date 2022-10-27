const Router = require('express').Router();

const QueryExercise = require('../../domains/exercise/exerciseDomain');

Router.get('/', async (req, res) => {
    try {
        const EXERCISES = await QueryExercise.queryAllExercises();

        res.status(200).json(EXERCISES);
    }
    catch(err) {
        res.status(500).send(err.message);
    }
});

Router.get('/id/:id', async (req, res) => {
    try {
        const EXERCISE = await QueryExercise.queryOneExercise(req.params.id);

        res.status(200).json(EXERCISE);
    }
    catch(err) {
        res.status(500).send(err.message);
    }
});

Router.get('/type', async (req, res) => {
    try {
        const TYPE = req.body.type;
        const EXERCISES = await QueryExercise.queryExercisesByType(TYPE);

        res.status(200).json(EXERCISES);
    }
    catch(err) {
        res.status(500).send(err.message);
    }
});

Router.get('/name', async (req, res) => {
    try {
        const NAME = req.body.name;
        const EXERCISES = await QueryExercise.queryExercisesByName(NAME);

        res.status(200).json(EXERCISES);
    }
    catch(err) {
        res.status(500).send(err.message);
    }
})

module.exports = Router;