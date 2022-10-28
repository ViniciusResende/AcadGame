const AUTH_ADAPTER = require('../../adapters/authentication/authAdapter');

class authGate {
   async makeLogin(user, password) {
      try {
         await AUTH_ADAPTER.login(user, password);
      }
      catch (err) {
         throw err;
      }
   }
}

module.exports = new authGate;