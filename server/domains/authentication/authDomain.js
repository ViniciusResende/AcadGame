const authExitGate = require('../../gates/authentication/authExitGate');

class authDomain {
   async registerUser(userInfo) {
      try {
         const TOKEN = await authExitGate.registerUser(userInfo);

         return TOKEN;
      }
      catch(err) {
         throw err;
      }
   }

   async authenticateUser(email, password) {
      try {
         const TOKEN = authExitGate.authenticateUser(email. password);

         return TOKEN;
      }
      catch(err) {
         throw err;
      }
   }
}

module.exports = new authDomain;