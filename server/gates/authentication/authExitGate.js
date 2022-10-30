const AUTH_ADAPTER = require('../../adapters/authentication/authAdapter');

class authGate {
   async makeLogin(req, res, next) {
      try {
         await AUTH_ADAPTER.login(req, res, next);
      }
      catch (err) {
         throw err;
      }
   }
}

module.exports = new authGate;