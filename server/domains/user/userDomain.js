const SERVER_ERROR = require('../../utils/serverErrors');

const QUERY_USER = require('../../gates/user/userExitGate');

class User {
    async createUser(userInfo) {
        try {
            const NEW_USER = await QUERY_USER.createNewUser(userInfo);
            return NEW_USER;
        } 
        catch (err) {
            throw err;
        }
    }

    async getEveryUser() {
        try {
            const EVERY_USER = await QUERY_USER.getAllUsers();

            return EVERY_USER;
        }
        catch (err) {
            /* istanbul ignore next */
            throw err;
        }
    }

    async getSingleUser(userID) {
        try {
            const USER = await QUERY_USER.getOneUser(userID);

            return USER;
        }
        catch (err) {
            /* istanbul ignore next */
            throw err;
        }
    }

    async getUserByEmail(email) {
        try {
            const USER = await QUERY_USER.getUserByEmail(email);

            return USER;
        } 
        catch (err) {
            /* istanbul ignore next */
            throw err;
        }
    }
    
    async getUserByEmailWithPassword(email) {
        try {
            const USER = await QUERY_USER.getUserByEmailWithPassword(email);

            return USER;
        } 
        catch (err) {
            /* istanbul ignore next */
            throw err;
        }
    }

    async getUserByNickname(nickname) {
        try {
            const USER = await QUERY_USER.getUserByNickname(nickname);

            return USER;
        }
        catch (err) {
            /* istanbul ignore next */
            throw err;
        }
    }

    async getTopRankUsers(rank) {
        try {
            const TOP_RANK_USERS = await QUERY_USER.getTopRankUsers(rank);

            return TOP_RANK_USERS;
        }
        catch (err) {
            /* istanbul ignore next */
            throw err;
        }
    }

    async updateUserInfo(userId, userInfo) {
        try {
            if (userInfo.email) {
                const EMAIL_CONFLICT = await this.getUserByEmail(userInfo.email);

                if (EMAIL_CONFLICT && EMAIL_CONFLICT.id != userId) {
                    let error = new SERVER_ERROR;
                    error.ServerError(400, 'Este e-mail já é utilizado por outra conta.');
                    
                    throw error;
                }
            }

            const UPDATED_USER = await QUERY_USER.updateUserInfo(userId, userInfo);

            return UPDATED_USER;
        }
        catch (err) {
            throw err;
        }
    }

    async deleteUserAccount(userId) {
        try {
            await QUERY_USER.deleteAccount(userId);
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = new User;