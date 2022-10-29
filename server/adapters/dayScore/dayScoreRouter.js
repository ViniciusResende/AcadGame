const Router = require('express').Router();

const DayScore = require('../../domains/dayScore/dayScoreDomain');

Router.get('/', async (req, res) => {
    try {
        let userId = req.query.userId;

        const DAY_SCORES = await DayScore.getUserDayScores(userId);

        res.status(200).json(DAY_SCORES);
    }
    catch(err) {
        res.status(500).send(err.message);
    }
});

module.exports = Router;