const authDomain = require('../../domains/authentication/authDomain');

const ROUTER = require('express').Router();

ROUTER.post('/register', async(req, res, next) => {
    try {
        const USER_INFO = req.body;

        const TOKEN = await authDomain.registerUser(USER_INFO);

        const responseObject = {
            data: {
                token: TOKEN,
                message: 'Enjoy your token!'
            }
        }

        res.status(201).send(responseObject);
    }
    catch(err) {
        err.message = {
            token: null,
            message: err.message
        }
        
        next(err);
    }
});

ROUTER.post('/authenticate', async(req, res, next) => {
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
        err.message = {
            token: null,
            message: err.message
        }
        
        next(err);
    }
});

module.exports = ROUTER;