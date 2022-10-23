const USER_DB_ADAPTER = require('../../adapters/user/userDBAdapter');

class QueryUser {
    EVERY_USER_INFO = ['nickName', 'email', 'password', 'score'];

    USER_REQUIRED_INFO = ['nickName', 'email', 'password'];


    async createNewUser(userInfo) {
        let newUser = new Object;

        try {
            // Assuring the userInfo object only contains valid properties
            Object.keys(userInfo).forEach(info => {
                if (this.USER_REQUIRED_INFO.includes(info)) {
                    newUser[info] = userInfo[info];
                }
            });
    
            // Assuring there are no necessary information being left behind
            for (const INFO of this.USER_REQUIRED_INFO) {
                if (!newUser[INFO]) {
                    throw new Error(`A informação ${INFO} é necessária para concluir o cadastro.`);
                }
            }

            USER_DB_ADAPTER.newUser(newUser);
        }
        catch (err) {
            throw err;
        }
    }

    async getAllUsers() {
        try {
            let allUsers = [];

            const QUERIED_USERS = await USER_DB_ADAPTER.getEveryUser();

            QUERIED_USERS.forEach(queriedUser => {
                allUsers.push(queriedUser.dataValues);
            });

            return allUsers;
        }
        catch (err) {
            throw err;
        }
    }

    async getOneUser(id) {
        try {
            const QUERIED_USER = await USER_DB_ADAPTER.getUserByPk(id);

            return QUERIED_USER;
        }
        catch (err) {
            throw err;
        }
    }

    async getUserByEmail(email) {
        try {
            const QUERIED_USER = await USER_DB_ADAPTER.getUserByEmail(email);

            return QUERIED_USER;
        } 
        catch (err) {
            throw err;
        }
    }

    async getUserByNickName(nickname) {
        try {
            const QUERIED_USER = await USER_DB_ADAPTER.getUsersByNick(nickname);

            return QUERIED_USER;
        } 
        catch (err) {
            throw err;
        }
    }

    async getTopRankUsers(rank) {
        try {
            let topRankUsers = [];

            const TOP_USERS = await USER_DB_ADAPTER.getTopUsers();

            let count = 0;
            TOP_USERS.forEach(user => {
                if (count < rank) topRankUsers.push(user.dataValues);

                count++;
            });

            return topRankUsers;
        }
        catch (err) {
            throw err;
        }
    }

    async updateUserInfo(reqUserId, updateUserId, userInfo) {
        try {
            if (reqUserId != updateUserId) {
                throw new Error('Você não pode alterar as informações de outro usuário.');
            }

            if (Object.keys(userInfo).length === 0) {
                throw new Error('É necessário fornecer as alterações desejadas.') ;
            }
            
            Object.keys(userInfo).forEach((info) => {
                if(!this.EVERY_USER_INFO.includes(info)) {
                    throw new Error(`Uma das propriedades fornecidas não é válida.`);
                }
            });

            USER_DB_ADAPTER.updateUser(updateUserId, userInfo);
        }
        catch (err) {
            throw err;
        }
    }

    async deleteAccount(reqUserId, deletionUserId) {
        try {
            if (reqUserId != deletionUserId) {
                throw new Error('Você não pode deletar a conta de outra pessoa.');
            }

            USER_DB_ADAPTER.eraseAccount(deletionUserId);
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = QueryUser;