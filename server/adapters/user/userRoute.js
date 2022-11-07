const ROUTER = require('express').Router();
const authMiddleware = require('../../middlewares/auth');

const userDomain = require('../../domains/user/userDomain');

ROUTER.use(authMiddleware);

ROUTER.get('/', async (req, res) => {
    try {
        const USERS = await userDomain.getEveryUser();

        res.status(200).json(USERS);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});

ROUTER.get('/me', async (req, res) => {
    try {
        const USER_ID = req.userId;

        const SINGLE_USER = await userDomain.getSingleUser(USER_ID);

        res.status(200).json(SINGLE_USER);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});

ROUTER.get('/email', async (req, res) => {
    try {
        const USER_EMAIL = req.body.email;

        const USER_BY_EMAIL = await userDomain.getUserByEmail(USER_EMAIL);

        res.status(200).json(USER_BY_EMAIL);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});

ROUTER.get('/nickname', async (req, res) => {
    try {
        const USER_NICKNAME = req.body.nickname;

        const USER_BY_NICKNAME = await userDomain.getUserByNickname(USER_NICKNAME);

        res.status(200).json(USER_BY_NICKNAME);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});

ROUTER.get('/top/:rank', async (req, res) => {
    try {
        const RANK = req.params.rank;

        const TOP_RANK_USERS = await userDomain.getTopRankUsers(RANK);

        res.status(200).json(TOP_RANK_USERS);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});

ROUTER.put('/', async (req, res) => {
    try {
        const USER_INFO = req.body.userInfo;

        const USER_ID = req.userId;

        await userDomain.updateUserInfo(USER_ID, USER_INFO);

        res.status(200).send('Usuário atualizado com sucesso!');
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});

ROUTER.delete('/:id', async (req, res) => {
    try {
        const DELETION_USER_ID = req.body.userId;
        const REQ_USER_ID = req.params.id;

        await userDomain.deleteUserAccount(REQ_USER_ID, DELETION_USER_ID);

        res.status(200).send('Usuário excluído com sucesso!');
    }
    catch(err) {
        res.status(400).send(err.message);
    }
});

module.exports = ROUTER;