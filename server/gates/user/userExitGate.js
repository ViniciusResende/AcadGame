const SERVER_ERROR = require('../../utils/serverErrors');

const USER_DB_ADAPTER = require('../../adapters/user/userDBAdapter');

class QueryUser {
    EVERY_USER_INFO = ['nickname', 'profileIcon', 'email', 'password', 'score'];

    USER_REQUIRED_INFO = ['nickname', 'email', 'password'];


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
                    let error = new SERVER_ERROR;
                    error.ServerError(400, `A informação ${INFO} é necessária para concluir o cadastro.`);
                    
                    throw error;
                }
            }

            const NEW_USER = await USER_DB_ADAPTER.newUser(newUser);

            return NEW_USER;
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
            /* istanbul ignore next */
            throw err;
        }
    }

    async getOneUser(id) {
        try {
            const QUERIED_USER = await USER_DB_ADAPTER.getUserByPK(id);

            return QUERIED_USER;
        }
        catch (err) {
            /* istanbul ignore next */
            throw err;
        }
    }

    async getUserByEmail(email) {
        try {
            const QUERIED_USER = await USER_DB_ADAPTER.getUserByEmail(email);

            return QUERIED_USER;
        } 
        catch (err) {
            /* istanbul ignore next */
            throw err;
        }
    }

    async getUserByEmailWithPassword(email) {
        try {
            const QUERIED_USER = await USER_DB_ADAPTER.getUserByEmailWithPassword(email);

            return QUERIED_USER;
        } 
        catch (err) {
            /* istanbul ignore next */
            throw err;
        }
    }

    async getUserByNickname(nickname) {
        try {
            const QUERIED_USER = await USER_DB_ADAPTER.getUsersByNick(nickname);

            return QUERIED_USER;
        } 
        catch (err) {
            /* istanbul ignore next */
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
            /* istanbul ignore next */
            throw err;
        }
    }

    async updateUserInfo(userId, userInfo) {
        try {
            if (Object.keys(userInfo).length === 0) {
                return;
            }
            
            Object.keys(userInfo).forEach((info) => {
                if(!this.EVERY_USER_INFO.includes(info)) {
                    let error = new SERVER_ERROR;
                    error.ServerError(400, `Uma das propriedades fornecidas não é válida.`);

                    throw error;
                }
            });

            const UPDATED_USER = await USER_DB_ADAPTER.updateUser(userId, userInfo);

            return UPDATED_USER;
        }
        catch (err) {
            throw err;
        }
    }

    async deleteAccount(userId) {
        try {
            await USER_DB_ADAPTER.eraseAccount(userId);
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = new QueryUser;