const USER = require('../../infrastructure/models/user');

const bcrypt = require('bcrypt');

const { Op } = require('sequelize');

const SERVER_ERROR = require('../../utils/serverErrors');

class UserDatabaseAdapter {
    unnecessaryAttributes = ['createdAt', 'updatedAt', 'password'];

    async newUser(userInfo) {
        try {
            const SALT_ROUNDS = 10;
            userInfo.password = await bcrypt.hash(userInfo.password, SALT_ROUNDS);

            userInfo.score = 0;
            const NEW_USER = await USER.create(userInfo);

            return NEW_USER;
        } 
        catch (err) {
            throw err;
        }
    }
    
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
                    exclude: ['createdAt', 'updatedAt']
                }
            });

            return QUERIED_USER;
        }
        catch (err) {
            throw err;
        }
    }

    async getUserByEmailWithPassword(email) {
        try {
            const QUERIED_USER = await USER.findOne({
                where: {
                    email: email
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            });

            return QUERIED_USER;
        }
        catch (err) {
            throw err;
        }
    }

    async getUsersByNick(nickname) {
        try {
            const QUERIED_USERS = USER.findAll({
                where: {
                    nickname: {
                        [Op.like]: `%${nickname}%`
                    }
                },
                attributes: {
                    exclude: this.unnecessaryAttributes
                }
            });
            
            return QUERIED_USERS;
        }
        catch (err) {
            throw err;
        }
    }

    async getTopUsers() {
        try {
            const ALL_USERS = await USER.findAll({
                attributes: {
                    exclude: this.unnecessaryAttributes
                },
                order: [
                    ['score', 'DESC'],
                    ['nickname', 'DESC']
                ]
            });

            return ALL_USERS;
        }
        catch (err) {
            throw err;
        }
    }

    async updateUser(userId, userInfo){
        try {
            let updateUser =  await USER.findOne({
                where: {
                    id: userId
                }
            });
            
            if(!updateUser){
                let error = new SERVER_ERROR;
                error.ServerError(404, 'Usuário inexistente.');
                
                throw error;
            }
            
            if( Object.keys(userInfo).includes('password') ){
                const SALT_ROUNDS = 10;
                const ENCRYPTED_PASS = await bcrypt.hash(userInfo['password'], SALT_ROUNDS);
                updateUser['password'] = ENCRYPTED_PASS;
            }

            Object.keys(userInfo).forEach(async (info) => {
                if (info != 'password')
                    updateUser[info] = userInfo[info];
            });

            await updateUser.save({
                fields: Object.keys(userInfo)
            });

            const UPDATE_USER = Object.entries(updateUser.dataValues);

            const FILTERED_UPDATED_USER = UPDATE_USER.filter(([property, value]) => 
                !this.unnecessaryAttributes.includes(property)
            );

            const UPDATED_USER_RESPONSE = Object.fromEntries(FILTERED_UPDATED_USER);

            return UPDATED_USER_RESPONSE;
        }
        catch(err) {
            throw err;
        }
    }

    async eraseAccount(userId) {
        try {
            await USER.destroy({
                where: {
                    id: userId
                }
            });
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = new UserDatabaseAdapter;