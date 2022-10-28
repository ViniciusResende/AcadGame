const Router = require('express').Router();

const QueryExerciseSheet = require('../../domains/exerciseSheet/exerciseSheetDomain');

Router.get('/', async (req, res) => {
    let userId = req.query.userID; // TODO: pegar do JWT

    try {
        const EXERCISE_SHEETS = await QueryExerciseSheet.queryUserExerciseSheets(userId);

        res.status(200).json(EXERCISE_SHEETS);
    }
    catch(err) {
        res.status(500).send(err);
    }
});

module.exports = Router;