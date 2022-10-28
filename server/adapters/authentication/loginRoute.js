const ROUTER = require('express').Router();

const AUTH = require('../../domains/authentication/authDomain');

ROUTER.post('/', async (req, res) => {
    try {
        const EMAIL = req.body.email;
        const PASSWORD = req.body.password;

        const TOKEN = await AUTH.login(EMAIL, PASSWORD);

        res.status(200).json({
            message: "enjoy your token :)",
            token: TOKEN
        });
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = ROUTER;