const USER = require('../../infrastructure/models/user');

const bcrypt = require('bcrypt');

const { Op } = require('sequelize');

class UserDatabaseAdapter {
    unnecessaryAttributes = ['createdAt', 'updatedAt', 'password'];

    EVERY_USER_INFO = ['nickName', 'email', 'password', 'score'];

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
                throw new Error("Email já cadastrado.");
            }

            if(await USER.findOne({
                where: {
                    nickName: userInfo.nickName
                } 
            }) != null) {
                throw new Error("Apelido já escolhido por outro usuário.");
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

    async getTopUsers() {
        try {
            const ALL_USERS = await USER.findAll({
                attributes: {
                    exclude: this.unnecessaryAttributes
                },
                order: [
                    ['score', 'DESC'],
                    ['nickName', 'DESC']
                ]
            });

            return ALL_USERS;
        }
        catch (err) {
            throw err;
        }
    }

    async updateUser(reqUserId, updateUserId, userInfo){
        try {
            if (reqUserId != updateUserId) {
                throw new Error('Você não pode alterar as informações de outro usuário.');
            }
            
            if (Object.keys(userInfo).length === 0) {
                throw new Error('É necessário fornecer as alterações desejadas.') ;
            }
            
            Object.keys(userInfo).forEach((info) => {
                if(!this.EVERY_USER_INFO.includes(info)) {
                    throw new Error(`Uma das propriedades fornecidas não é válida.`);
                }
            });

            if(await USER.findOne({
                where: {
                    email: userInfo.email
                } 
            }) != null) {
                throw new Error("Este e-mail já é utilizado por outra conta.");
            }

            if(await USER.findOne({
                where: {
                    nickName: userInfo.nickName
                } 
            }) != null) {
                throw new Error("Este apelido já está em uso por outro usuário.");
            }

            let updateUser =  await USER.findByPk(updateUserId);
    
            if(updateUser == null){
                throw new Error('O usuário a ser atualizado não existe.');
            }

            Object.keys(userInfo).forEach(async (info) => {
                if(info == 'password'){
                    const SALT_ROUNDS = 10;
                    updateUser[info] = await bcrypt.hash(userInfo[info], SALT_ROUNDS);
                }
                else {
                    updateUser[info] = userInfo[info];
                }
            });

            await updateUser.save();
        }
        catch(err) {
            throw err;
        }
    }

    async eraseAccount(reqUserId, deletionUserId) {
        try {
            if (reqUserId != deletionUserId) {
                throw new Error('Você não pode deletar a conta de outra pessoa.');
            }

            await USER.destroy({
                where: {
                    id: deletionId
                }
            });
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = UserDatabaseAdapter;