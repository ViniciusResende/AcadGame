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

Router.get('/user/last7days', async (req, res) => {
    try {
        let userId = req.query.userId;

        const LAST_7_SAY_SCORES = await DayScore.getLast7DaysScores(userId);

        res.status(200).json(LAST_7_SAY_SCORES);
    }
    catch(err) {
        res.status(500).send(err.message);
    }
})

module.exports = Router;