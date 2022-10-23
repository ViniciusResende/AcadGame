const Router = require('express').Router();

const QueryExercise = require('../../gates/exercise/exerciseEntryGate');

Router.get('/', async (req, res) => {
    try {
        const EXERCISES = await QueryExercise.searchAllExercises();

        res.status(200).json(EXERCISES);
    }
    catch(err) {
        res.status(500).send(err);
    }
});

Router.get('/:id', async (req, res) => {
    try {
        const EXERCISE = await QueryExercise.getOneExercise(req.params.id);

        res.status(200).json(EXERCISE);
    }
    catch(err) {
        res.status(500).send(err);
    }
});

module.exports = Router;