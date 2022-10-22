const USER = require('../../infrastructure/models/user');

const { Op } = require('sequelize');

class UserDatabaseAdapter {
    unnecessaryAttributes = ['createdAt', 'updatedAt', 'password'];

    async getEveryUser() {
        try {
            const ALL_USERS = await USER.findAll({
                attributes: {
                    exclude: this.unnecessaryAttributes
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
                    exclude: this.unnecessaryAttributes
                }
            });

            if (!QUERIED_USER) {
                throw new Error(`Não encontramos um usuário com a ID informada.`);
            }

            return QUERIED_USER;
        }
        catch (err) {
            throw err;
        }
    }

    async getUserByEmail(email) {
        try {
            const QUERIED_USER = await USER.findOne({
                where: {
                    email: email
                },
                attributes: {
                    exclude: this.unnecessaryAttributes
                }
            });

            if (!QUERIED_USER) {
                throw new Error('Não encontramos este usuário no sistema.');
            }

            return QUERIED_USER;
        } catch (err) {
            throw err;
        }
    }

    async getUsersByNick(nickname) {
        try {
            const QUERIED_USERS = USER.findAll({
                where: {
                    nickName: {
                        [Op.like]: `%${nickname}%`
                    }
                },
                attributes: {
                    exclude: this.unnecessaryAttributes
                }
            });

            if (!QUERIED_USERS) {
                throw new Error('Não encontramos um usuário com nome semelhante a esse.');
            }
            
            return QUERIED_USERS;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = UserDatabaseAdapter;