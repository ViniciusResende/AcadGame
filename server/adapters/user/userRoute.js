const ROUTER = require('express').Router();

const userDomain = require('../../domains/user/userDomain');

ROUTER.get('/', async (req, res, next) => {
    try {
        const USERS = await userDomain.getEveryUser();

        res.status(200).json(USERS);
    }
    catch (err) {
        next(err);
    }
});

ROUTER.get('/me', async (req, res, next) => {
    try {
        const USER_ID = req.userId;

        const SINGLE_USER = await userDomain.getSingleUser(USER_ID);

        res.status(200).json(SINGLE_USER);
    }
    catch (err) {
        next(err);
    }
});

ROUTER.get('/email', async (req, res, next) => {
    try {
        const USER_EMAIL = req.body.email;

        const USER_BY_EMAIL = await userDomain.getUserByEmail(USER_EMAIL);

        res.status(200).json(USER_BY_EMAIL);
    }
    catch (err) {
        next(err);
    }
});

ROUTER.get('/nickname', async (req, res, next) => {
    try {
        const USER_NICKNAME = req.body.nickname;

        const USER_BY_NICKNAME = await userDomain.getUserByNickname(USER_NICKNAME);

        res.status(200).json(USER_BY_NICKNAME);
    }
    catch (err) {
        next(err);
    }
});

ROUTER.get('/top/:rank', async (req, res, next) => {
    try {
        const RANK = req.params.rank;

        const TOP_RANK_USERS = await userDomain.getTopRankUsers(RANK);

        res.status(200).json(TOP_RANK_USERS);
    }
    catch (err) {
        next(err);
    }
});

ROUTER.put('/', async (req, res, next) => {
    try {
        const USER_INFO = req.body.userInfo;

        const USER_ID = req.userId;

        await userDomain.updateUserInfo(USER_ID, USER_INFO);

        res.status(200).send('Usuário atualizado com sucesso!');
    }
    catch (err) {
        next(err);
    }
});

ROUTER.delete('/', async (req, res, next) => {
    try {
        const USER_ID = req.userId;

        await userDomain.deleteUserAccount(USER_ID);

        res.status(200).send('Usuário excluído com sucesso!');
    }
    catch(err) {
        next(err);
    }
});

module.exports = ROUTER;