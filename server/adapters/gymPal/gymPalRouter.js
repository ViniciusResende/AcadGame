const ROUTER = require('express').Router();

ROUTER.get('/me/accepted', async (req, res, next) => {
    try {
        res.status(200).send('Essa rota é responsável por retornar todos os amigos do usuário que realizou a requisição.')
    }
    catch (err) {
        next(err);
    }
});