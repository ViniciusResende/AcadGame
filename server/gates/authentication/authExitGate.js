const USER_DOMAIN = require('../../domains/user/userDomain');

const AUTH_ADAPTER = require('../../adapters/authentication/authAdapter');

class AuthenticationEntryGate {
   async registerUser(userInfo) {
      try {
         const USER = await USER_DOMAIN.createUser(userInfo);

         const TOKEN = AUTH_ADAPTER.generateToken({ id: USER.id });

         return { token: TOKEN };
      }
      catch(err) {
         throw err;
      }
   }

   async authenticateUser(email, password) {
      try {
         const USER = await USER_DOMAIN.getUserByEmail(email);

         if(!await bcrypt.compare(password, USER.password))
            throw new Error('Senha inválida.');

         const token = generateToken({ id: USER.id });

         return { token };
      }
      catch(err) {
         throw err;
      }
   }
}

module.exports = new AuthenticationEntryGate;