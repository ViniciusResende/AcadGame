const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userDomain = require('../../domains/user/userDomain');

function generateToken(params = {}) {
   return jwt.sign(params, process.env.JWT_SECRET, {
       expiresIn: 86400, // token expires in one day
   });
}

class AuthenticationEntryGate {
   async registerUser(userInfo) {
      try {
         const user = await userDomain.createUser(userInfo);

         const token = generateToken({ id: user.id });

         return { token };
      }
      catch(err) {
         throw err;
      }
   }

   async authenticateUser(email, password) {
      try {
         const USER = await userDomain.getUserByEmail(email);

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