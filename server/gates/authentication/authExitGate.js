const USER_DOMAIN = require('../../domains/user/userDomain');

const AUTH_ADAPTER = require('../../adapters/authentication/authAdapter');

const SERVER_ERROR = require('../../utils/serverErrors');

class AuthenticationEntryGate {
   async registerUser(userInfo) {
      try {
         const USER = await USER_DOMAIN.createUser(userInfo);

         const TOKEN = AUTH_ADAPTER.generateToken({ id: USER.id });

         return TOKEN;
      }
      catch(err) {
         throw err;
      }
   }

   async authenticateUser(email, password) {
      try {
         const USER = await USER_DOMAIN.getUserByEmail(email);
         if(!USER) {
            let error = new SERVER_ERROR;
            error.ServerError(400, 'E-mail não cadastrado.')

            throw error;
         }

         console.log(USER);
         console.log(email);

         const MATCHING_PASSWORDS = AUTH_ADAPTER.checkPasswords(password, USER.password);
         if(!MATCHING_PASSWORDS) {
            let error = new SERVER_ERROR;
            error.ServerError(400, 'Senha inválida.')

            throw error;
         }
         

         const TOKEN = AUTH_ADAPTER.generateToken({id: USER.id});

         return TOKEN;
      }
      catch(err) {
         throw err;
      }
   }
}

module.exports = new AuthenticationEntryGate;