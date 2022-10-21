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

    async getUserByPK(id) {
        try {
            const QUERIED_USER = await USER.findByPk(id, {
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password']
                }
            });

            if (!QUERIED_USER) {
                throw new Error(`Não encontramos um usuário com id "${id}"`);
            }

            return QUERIED_USER;
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = UserDatabaseAdapter;