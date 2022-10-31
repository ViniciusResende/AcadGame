const ROUTER = require('express').Router();

const AUTH_DOMAIN = require('../../domains/authentication/authDomain');

ROUTER.post('/login', 
    (req, res, next) => {
        if (!req.isAuthenticated())
            AUTH_DOMAIN.login(req, res, next);
        else
            res.status(400).send('Você já está logado!');
    },
    async (req, res, next) => {
        try {
            res.status(200).send({
                token: req.cookies['connect.sid'],
                message: 'Enjoy your token! :)'
            });
        }
        catch (err) {
            next(err);
        }
});

ROUTER.delete('/logout', (req, res, next) => {
    try {
        AUTH_DOMAIN.logout(req);

        res.status(200).send('Logout efetuado com sucesso.');
    }
    catch (err) {
        next(err);
    }
});

module.exports = ROUTER;