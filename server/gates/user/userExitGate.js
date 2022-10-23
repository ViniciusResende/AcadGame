const USER_DB_ADAPTER = require('../../adapters/user/userDBAdapter');

class QueryUser {
    async getAllUsers() {
        let allUsers = [];

        const QUERIED_USERS = await USER_DB_ADAPTER.getEveryUser();

        QUERIED_USERS.forEach(queriedUser => {
            allUsers.push(queriedUser.dataValues);
        });

        return allUsers;
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
}

module.exports = QueryUser;