const USER = require('../../infrastructure/models/user');

const bcrypt = require('bcrypt');

const { Op } = require('sequelize');

class UserDatabaseAdapter {
    unnecessaryAttributes = ['createdAt', 'updatedAt', 'password'];

    USER_REQUIRED_INFO = ['nickName', 'email', 'password'];

    async newUser(userInfo) {
        let user = new Object;

        try {
            // Assuring the userInfo object only contains valid properties
            Object.keys(userInfo).forEach(info => {
                if (this.USER_REQUIRED_INFO.includes(info)) {
                    user[info] = userInfo[info];
                }
            });

            // Assuring there are no necessary information being left behind
            for (const INFO of this.USER_REQUIRED_INFO) {
                if (!user[INFO]) {
                    throw new Error(`A informação ${INFO} é necessária para concluir o cadastro.`);
                }
            }
            
            const saltRounds = 10;
            user.password = await bcrypt.hash(user.password, saltRounds);

            if(await USER.findOne({
                where: {
                    email: userInfo.email
                } 
            }) != null) {
                throw new Error("Usuário já cadastrado.");
            }

            await USER.create(user);
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