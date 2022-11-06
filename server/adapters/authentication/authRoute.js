const authDomain = require('../../domains/authentication/authDomain');

const ROUTER = require('express').Router();

ROUTER.post('/register', async(req, res) => {
    try {
        const USER_INFO = req.body;

        const TOKEN = await authDomain.registerUser(USER_INFO);

        const responseObject = {
            data: {
                token: TOKEN,
                message: 'Enjoy your token!'
            }
        }

        res.status(200).send(responseObject);
    }
    catch(err) {
        res.status(400).send({
            token: null,
            message: err.message
        });
    }
});

ROUTER.post('/authenticate', async(req, res) => {
    try {
        const EMAIL = req.body.email;
        const PASSWORD = req.body.password;

        const TOKEN = await authDomain.authenticateUser(EMAIL, PASSWORD);

        const responseObject = {
            data: {
                token: TOKEN,
                message: 'Enjoy your token!'
            }
        }

        res.status(200).send(responseObject);
    }
    catch(err) {
        res.status(400).send({
            token: null,
            message: err.message
        });
    }
});

module.exports = ROUTER;