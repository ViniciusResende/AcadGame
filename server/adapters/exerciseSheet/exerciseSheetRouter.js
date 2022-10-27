const Router = require('express').Router();

const QueryExerciseSheet = require('../../domains/exerciseSheet/exerciseSheetDomain');

Router.get('/', async (req, res) => {
    let userId = req.query.userID;

    try {
        const EXERCISE_SHEET = await QueryExerciseSheet.queryUserExerciseSheets(userId);

        res.status(200).json(EXERCISE_SHEET);
    }
    catch(err) {
        res.status(500).send(err);
    }
});

module.exports = Router;