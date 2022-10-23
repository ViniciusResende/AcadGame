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
}

module.exports = QueryUser;