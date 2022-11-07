const Router = require('express').Router();

const DayScore = require('../../domains/dayScore/dayScoreDomain');

Router.get('/', async (req, res, next) => {
    try {
        const USER_ID = req.userId;

        const DAY_SCORES = await DayScore.getUserDayScores(USER_ID);

        res.status(200).json(DAY_SCORES);
    }
    catch(err) {
        next(err);
    }
});

Router.get('/user/last7days', async (req, res, next) => {
    try {
        const USER_ID = req.userId;

        const LAST_7_DAYS_SCORES = await DayScore.getLast7DaysScores(USER_ID);

        const responseObject = {
            data: LAST_7_DAYS_SCORES
        }

        res.status(200).json(responseObject);
    }
    catch(err) {
        next(err);
    }
});

Router.post('/user/add', async (req, res, next) => {
    try {
        const USER_ID = req.userId;
        const SENT_EXERCISES_INFO = req.body;

        await DayScore.createDailyScore(USER_ID, SENT_EXERCISES_INFO);

        res.status(201).send({
            data: {
                message: 'Pontuações diárias cadastradas com sucesso!'
            }
        });
    }
    catch(err) {
        next(err);
    }
});

Router.get('/weekPodium', async (req, res, next) => {
    try {
        const WEEK_PODIUM = await DayScore.getWeekPodium();

        res.status(200).json({ data: WEEK_PODIUM });
    }
    catch(err) {
        next(err);
    }
});

Router.get('/user/ranking', async (req, res, next) => {
    try {
        const userId = req.userId;

        const userRank = await DayScore.getUserWeeklyRank(userId);

        res.status(200).json({ data: userRank });
    }
    catch(err) {
        next(err);
    }
});

module.exports = Router;