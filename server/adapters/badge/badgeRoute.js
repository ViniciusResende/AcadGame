const ROUTER = require('express').Router();

const BADGE_DOMAIN = require('../../domains/badge/badgeDomain');

ROUTER.get('/', async (req, res) => {
    try {
        const BADGES = await BADGE_DOMAIN.queryAllBadges();

        res.status(200).json(BADGES);
    }
    catch(err) {
        res.status(500).send(err.message);
    }
});

ROUTER.get('/id/:id', async (req, res) => {
    try {
        const BADGE = await BADGE_DOMAIN.queryOneBadge(req.params.id);

        res.status(200).json(BADGE);
    }
    catch(err) {
        res.status(500).send(err.message);
    }
});

module.exports = ROUTER;