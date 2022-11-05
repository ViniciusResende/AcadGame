const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class authAdapter {
    generateToken(params = {}) {
        const TOKEN = jwt.sign(params, process.env.JWT_SECRET, {
            expiresIn: process.env.COOKIE_DURATION,
        });

        return TOKEN;
    }

    async checkPasswords(inputedPassword, hashedPassword) {
        const MATCH = await bcrypt.compare(inputedPassword, hashedPassword);

        if(!MATCH)
            return false;
        else
            return true;
    }
}

module.exports = new authAdapter;