const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class authAdapter {
    generateToken(params = {}) {
        try {
            const TOKEN = jwt.sign(params, process.env.PRODUCTION_JWT_SECRET, {
                expiresIn: process.env.PRODUCTION_COOKIE_DURATION,
            });
            
            return TOKEN;
        }
        catch (err) {
            /* istanbul ignore next */
            throw err;
        }
    }

    async checkPasswords(inputedPassword, hashedPassword) {
        try {
            const MATCH = await bcrypt.compare(inputedPassword, hashedPassword);

            if(!MATCH)
                return false;
            else
                return true;
        }
        catch(err) {
            /* istanbul ignore next */
            throw err;
        }
    }
}

module.exports = new authAdapter;
