const authDomain = require('../../domains/authentication/authDomain');

const ROUTER = require('express').Router();

ROUTER.post('/register', async(req, res) => {
    try {
        const USER_INFO = req.body;

        const TOKEN = await authDomain.registerUser(USER_INFO);

        res.status(200).send(TOKEN);
    }
    catch(err) {
        res.status(500).send(err.message);
    }
});

ROUTER.post('/authenticate', async(req, res) => {
    try {
        const EMAIL = req.body.email;
        const PASSWORD = req.body.password;

        const TOKEN = await authDomain.authenticateUser(EMAIL, PASSWORD);

        res.status(200).send(TOKEN);
    }
    catch(err) {
        res.status(500).send(err.message);
    }
});

module.exports = ROUTER;