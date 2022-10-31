const ROUTER = require('express').Router();

const USER_DOMAIN = require('../../domains/user/userDomain');

const AUTH_DOMAIN = require('../../domains/authentication/authDomain');

ROUTER.post('/signUp', async (req, res) => {
    try {
        const USER_INFO = req.body;

        await USER_DOMAIN.createUser(USER_INFO);

        res.status(200).send('Usuário cadastrado com sucesso!');
    }
    catch (err) {
        next(err);
    }
});

ROUTER.get('/', (req, res, next) => AUTH_DOMAIN.isLoggedIn(req, res, next),
    async (req, res) => {
        try {
            const USERS = await USER_DOMAIN.getEveryUser();

            res.status(200).json(USERS);
        }
        catch (err) {
            next(err);
        }
    }
);

ROUTER.get('/id/:id', (req, res, next) => AUTH_DOMAIN.isLoggedIn(req, res, next),
    async (req, res) => {
        try {
            const USER_ID = req.params.id;

            const SINGLE_USER = await USER_DOMAIN.getSingleUser(USER_ID);

            res.status(200).json(SINGLE_USER);
        }
        catch (err) {
            next(err);
        }
    }
);

ROUTER.get('/email', (req, res, next) => AUTH_DOMAIN.isLoggedIn(req, res, next),
    async (req, res) => {
        try {
            const USER_EMAIL = req.body.email;

            const USER_BY_EMAIL = await USER_DOMAIN.getUserByEmail(USER_EMAIL);

            res.status(200).json(USER_BY_EMAIL);
        }
        catch (err) {
            next(err);
        }
    }
);

ROUTER.get('/nickname', (req, res, next) => AUTH_DOMAIN.isLoggedIn(req, res, next),
    async (req, res) => {
        try {
            const USER_NICKNAME = req.body.nickname;

            const USER_BY_NICKNAME = await USER_DOMAIN.getUserByNickname(USER_NICKNAME);

            res.status(200).json(USER_BY_NICKNAME);
        }
        catch (err) {
            next(err);
        }
    }
);

ROUTER.get('/top/:rank', (req, res, next) => AUTH_DOMAIN.isLoggedIn(req, res, next),
    async (req, res) => {
        try {
            const RANK = req.params.rank;

            const TOP_RANK_USERS = await USER_DOMAIN.getTopRankUsers(RANK);

            res.status(200).json(TOP_RANK_USERS);
        }
        catch (err) {
            next(err);
        }
    }
);

ROUTER.put('/:id', (req, res, next) => AUTH_DOMAIN.isLoggedIn(req, res, next),
    async (req, res) => {
        try {
            const USER_INFO = req.body.userInfo;
            const REQ_USER_ID = req.body.userId;
            const UPDATE_USER_ID = req.params.id;

            await USER_DOMAIN.updateUserInfo(REQ_USER_ID, UPDATE_USER_ID, USER_INFO);

            res.status(200).send('Usuário atualizado com sucesso!');
        }
        catch (err) {
            next(err);
        }
    }
);

ROUTER.delete('/:id', (req, res, next) => AUTH_DOMAIN.isLoggedIn(req, res, next),
    async (req, res) => {
        try {
            const DELETION_USER_ID = req.body.userId;
            const REQ_USER_ID = req.params.id;

            await USER_DOMAIN.deleteUserAccount(REQ_USER_ID, DELETION_USER_ID);

            res.status(200).send('Usuário excluído com sucesso!');
        }
        catch(err) {
            next(err);
        }
    }
);

module.exports = ROUTER;