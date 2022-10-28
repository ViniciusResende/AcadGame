const Router = require('express').Router();

const QueryExerciseSheet = require('../../domains/exerciseSheet/exerciseSheetDomain');

Router.get('/', async (req, res) => {
    let userId = req.query.userID; // TODO: pegar do JWT

    try {
        const EXERCISE_SHEETS = await QueryExerciseSheet.queryUserExerciseSheets(userId);

        res.status(200).json(EXERCISE_SHEETS);
    }
    catch(err) {
        res.status(500).send(err.message);
    }
});

Router.post('/', async (req, res) => {
    try {
        const USER_EXERCISE_INFO = req.body;
        console.log(req);
        await QueryExerciseSheet.createUserExercise(USER_EXERCISE_INFO);

        res.status(200).send('Exercício cadastrado em sua ficha com sucesso!');
    }
    catch(err) {
        res.status(500).send(err.message);
    }
})

module.exports = Router;