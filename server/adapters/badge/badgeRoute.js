const Router = require('express').Router();

const QueryBadge = require('../../gates/badge/badgeEntryGate');

Router.get('/', async (req, res) => {
    try {
        const BADGES = await QueryBadge.searchAllBadges();

        res.status(200).json(BADGES);
    }
    catch(err) {
        res.status(500).send(err);
    }
});

Router.get('/id/:id', async (req, res) => {
    try {
        const BADGE = await QueryBadge.getOneBadge(req.params.id);

        res.status(200).json(BADGE);
    }
    catch(err) {
        res.status(500).send(err);
    }
});

module.exports = Router;