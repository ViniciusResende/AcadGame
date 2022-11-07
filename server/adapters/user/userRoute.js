const ROUTER = require('express').Router();

const USER_DOMAIN = require('../../domains/user/userDomain');

ROUTER.get('/', async (req, res, next) => {
    try {
        const USERS = await userDomain.getEveryUser();

            res.status(200).json(USERS);
        }
        catch (err) {
            next(err);
        }
    }
    catch (err) {
        next(err);
    }
);

ROUTER.get('/me', async (req, res, next) => {
    try {
        const USER_ID = req.userId;

            const USER_BY_EMAIL = await USER_DOMAIN.getUserByEmail(USER_EMAIL);

            res.status(200).json(USER_BY_EMAIL);
        }
        catch (err) {
            next(err);
        }
    }
    catch (err) {
        next(err);
    }
);

ROUTER.get('/email', async (req, res, next) => {
    try {
        const USER_EMAIL = req.body.email;

            const TOP_RANK_USERS = await USER_DOMAIN.getTopRankUsers(RANK);

            res.status(200).json(TOP_RANK_USERS);
        }
        catch (err) {
            next(err);
        }
    }
    catch (err) {
        next(err);
    }
);

ROUTER.get('/nickname', async (req, res, next) => {
    try {
        const USER_NICKNAME = req.body.nickname;

            await USER_DOMAIN.deleteUserAccount(REQ_USER_ID, DELETION_USER_ID);

            res.status(200).send('Usuário excluído com sucesso!');
        }
        catch(err) {
            next(err);
        }
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