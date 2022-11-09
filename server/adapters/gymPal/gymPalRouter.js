const ROUTER = require('express').Router();

const GYM_PALS = require('../../domains/gymPal/gymPalDomain');

ROUTER.post('/add', async (req, res, next) => {
    try {
        const SENDER_ID = req.userId;
        const RECEIVER_ID = req.body.userTargetId;

        const NEW_FRIENDSHIP = await GYM_PALS.requestFriendship(SENDER_ID, RECEIVER_ID);

        res.status(200).json(NEW_FRIENDSHIP);
    }
    catch (err) {
        next(err);
    }
});

ROUTER.get('/pending', async (req, res, next) => {
    try {
        const USER_ID = req.userId;

        const PENDING_FRIENDSHIP_REQUESTS = await GYM_PALS.getPendingFriendshipRequests(USER_ID);

        res.status(200).json(PENDING_FRIENDSHIP_REQUESTS);
    }
    catch (err) {
        next(err);
    }
});

ROUTER.put('/accept', async (req, res, next) => {
    try {
        const FRIENDSHIP_ID = req.body.friendshipId;

        await GYM_PALS.acceptFriendshipRequest(FRIENDSHIP_ID);

        res.status(200).send('Pedido aceito com sucesso.');
    }
    catch (err) {
        next(err);
    }
});

ROUTER.delete('/reject', async (req, res, next) => {
    try {
        const FRIENDSHIP_ID = req.body.friendshipId;

        await GYM_PALS.rejectFriendshipRequest(FRIENDSHIP_ID);

        res.status(200).send('Pedido recusado com sucesso.');
    }
    catch (err) {
        next(err);
    }
});

ROUTER.get('/connections', async (req, res, next) => {
    try {
        const USER_ID = req.userId;

        const USER_GYM_PALS = await GYM_PALS.getUserGymPals(USER_ID);

        res.status(200).json(USER_GYM_PALS);
    }
    catch (err) {
        next(err);
    }
});

ROUTER.delete('/remove', async (req, res, next) => {
    try {
        res.status(200).send('O objetivo dessa rota é permitir ao usuário excluir um amigo da rede.');
    }
    catch (err) {
        next(err);
    }
});

module.exports = ROUTER;