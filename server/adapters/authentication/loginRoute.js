const ROUTER = require('express').Router();

ROUTER.post('/', async (req, res) => {
    try {
        const EMAIL = req.body.email;
        const PASSWORD = req.body.password;

        res.status(200).json({
            message: "enjoy your token :)",
            token: "123"
        });
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = ROUTER;