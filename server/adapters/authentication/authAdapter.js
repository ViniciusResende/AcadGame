const PASSPORT = require('passport');

class AuthAdapter {
    async login(req, res, next) {
        try {
            await PASSPORT.authenticate('local')(req, res, next);
        }
        catch (err) {
            throw err;
        }
    }

    isLoggedIn(req, res, next) {
        if (!req.isAuthenticated()){
            return next(new Error('Você não está autenticado.'));
        }
        
        return next();
    }

    logout(req) {
        try {
            req.logOut(err => {            
                if(err)
                    throw new Error('Ocorreu um erro ao efetuar logout.');
            });
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = new AuthAdapter;