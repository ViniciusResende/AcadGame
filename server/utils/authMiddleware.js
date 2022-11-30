const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const AUTH_HEADER = req.headers.authorization;

    if(!AUTH_HEADER)
        return res.status(401).send({ error: 'No token provided' });

    const PARTS = AUTH_HEADER.split(' ');

    if(!PARTS.length === 2)
        return res.status(401).send({ error: 'Token error' });

    const [ scheme, token ] = PARTS;

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Malformatted token' });

    jwt.verify(token, process.env.PRODUCTION_JWT_SECRET, (err, decoded) => {
        if(err)
            return res.status(401).send({ error: 'Invalid token' });

        req.userId = decoded.id;
        return next();
    })
}