const USER = require('../../infrastructure/models/user');

class UserDatabaseAdapter {
    async getEveryUser() {
        try {
            const ALL_USERS = await USER.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password']
                }
            });

            return ALL_USERS;
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = UserDatabaseAdapter;