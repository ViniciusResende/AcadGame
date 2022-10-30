const QUERY_USER = require('../../gates/user/userExitGate');

class User {
    async createUser(userInfo) {
        try {
            if (userInfo.email) {
                const EMAIL_CONFLICT = await this.getUserByEmail(userInfo.email);

                if (EMAIL_CONFLICT) {
                    throw new Error("Este e-mail já é utilizado por outra conta.");
                }
            }

            await QUERY_USER.createNewUser(userInfo);
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
            throw err;
        }
    }

    async getSingleUser(userID) {
        try {
            const USER = await QUERY_USER.getOneUser(userID);

            return USER;
        }
        catch (err) {
            throw err;
        }
    }

    async getUserByEmail(email) {
        try {
            const USER = await QUERY_USER.getUserByEmail(email);

            return USER;
        } 
        catch (err) {
            throw err;
        }
    }
    
    async getUserByEmailWithPassword(email) {
        try {
            const USER = await QUERY_USER.getUserByEmailWithPassword(email);

            return USER;
        } 
        catch (err) {
            throw err;
        }
    }

    async getUserByNickname(nickname) {
        try {
            const USER = await QUERY_USER.getUserByNickname(nickname);

            return USER;
        }
        catch (err) {
            throw err;
        }
    }

    async getTopRankUsers(rank) {
        try {
            const TOP_RANK_USERS = await QUERY_USER.getTopRankUsers(rank);

            return TOP_RANK_USERS;
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

            if (userInfo.email) {
                const EMAIL_CONFLICT = await this.getUserByEmail(userInfo.email);

                if (EMAIL_CONFLICT && EMAIL_CONFLICT.id != updateUserId) {
                    throw new Error("Este e-mail já é utilizado por outra conta.");
                }
            }

            await QUERY_USER.updateUserInfo(updateUserId, userInfo);
        }
        catch (err) {
            throw err;
        }
    }

    async deleteUserAccount(reqUserId, deletionUserId) {
        try {
            if (reqUserId != deletionUserId) {
                throw new Error('Você não pode deletar a conta de outra pessoa.');
            }

            await QUERY_USER.deleteAccount(deletionUserId);
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = new User;