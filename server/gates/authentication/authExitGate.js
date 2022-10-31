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

   checkAuthentication(req, res, next) {
      AUTH_ADAPTER.isLoggedIn(req, res, next);
   }

   makeLogout(req) {
      try {
         AUTH_ADAPTER.logout(req);
      }
      catch (err) {
         throw err;
      }
   }
}

module.exports = new authGate;