const ROUTER = require('express').Router();

const BADGE_DOMAIN = require('../../domains/badge/badgeDomain');

ROUTER.get('/', async (req, res) => {
    try {
        const BADGES = await BADGE_DOMAIN.queryAllBadges();

        res.status(200).json(BADGES);
    }
    catch(err) {
        res.status(400).send(err.message);
    }
});

ROUTER.get('/id/:id', async (req, res) => {
    try {
        const BADGE = await BADGE_DOMAIN.queryOneBadge(req.params.id);

        res.status(200).json(BADGE);
    }
    catch(err) {
        res.status(400).send(err.message);
    }
});

ROUTER.get('/type', async (req, res) => {
    try {
        const TYPE = req.body.type;
        const BADGES = await BADGE_DOMAIN.queryBadgesByType(TYPE);
        
        res.status(200).send(BADGES);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});

ROUTER.get('/name', async (req, res) => {
    try {
        const NAME = req.body.name;
        const BADGES = await BADGE_DOMAIN.queryBadgesByName(NAME);

        res.status(200).send(BADGES);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = ROUTER;