const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class authAdapter {
    generateToken(params = {}) {
        try {
            const TOKEN = jwt.sign(params, process.env.JWT_SECRET, {
                expiresIn: process.env.COOKIE_DURATION,
            });
            
            return TOKEN;
        }
        catch (err) {
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
            throw err;
        }
    }
}

module.exports = new authAdapter;
