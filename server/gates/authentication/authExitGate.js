const USER_DOMAIN = require('../../domains/user/userDomain');

const AUTH_ADAPTER = require('../../adapters/authentication/authAdapter');

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
         if(!USER) throw new Error('E-mail não cadastrado.');

         console.log(USER);
         console.log(email);

         const MATCHING_PASSWORDS = AUTH_ADAPTER.checkPasswords(password, USER.password);
         if(!MATCHING_PASSWORDS) throw new Error('Senha inválida.');
         

         const TOKEN = AUTH_ADAPTER.generateToken({id: USER.id});

         return TOKEN;
      }
      catch(err) {
         throw err;
      }
   }
}

module.exports = new AuthenticationEntryGate;