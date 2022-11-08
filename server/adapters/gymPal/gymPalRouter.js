const ROUTER = require('express').Router();

ROUTER.get('/me/accepted', async (req, res, next) => {
    try {
        res.status(200).send('Essa rota é responsável por retornar todos os amigos do usuário que realizou a requisição.');
    }
    catch (err) {
        next(err);
    }
});

ROUTER.get('/me/pending', async (req, res, next) => {
    try {
        res.status(200).send('Essa rota retorna todos os pedido de amizade pendentes do usuário que realizou a requisição.');
    }
    catch (err) {
        next(err);
    }
});