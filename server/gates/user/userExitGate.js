const USER_DB_ADAPTER = require('../../adapters/user/userDBAdapter');

class QueryUser {
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

            return topRankUsers
        }
        catch (err) {
            
        }
    }
}

module.exports = QueryUser;