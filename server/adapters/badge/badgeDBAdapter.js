const BADGE = require('../../infrastructure/models/badge');

const SEVER_ERROR = require('../../utils/serverErrors');

const { Op } = require('sequelize');

class BadgeDatabaseAdapter {
    unnecessaryAttributes = ['createdAt', 'updatedAt'];

    async findAllBadges() {
        try {
            const ALL_BADGES = await BADGE.findAll({
                attributes: {
                    exclude: this.unnecessaryAttributes
                }
            });

            return ALL_BADGES;
        }
        catch(err) {
            throw err;
        }
    }

    async findOneBadge(id) {
        try {
            const QUERIED_BADGE = await BADGE.findByPk(id, {
                attributes: {
                    exclude: this.unnecessaryAttributes
                }
            });

            if (!QUERIED_BADGE) {
                let error = new SEVER_ERROR;
                error.ServerError(400, `Não encontramos uma insíngnia com id ${id}`);

                throw error;
            }

            return QUERIED_BADGE;
        } 
        catch (err) {
            throw err;
        }
    }

    async findByType(type) {
        try {
            const QUERIED_BADGES = await BADGE.findAll({
                where: {
                    type: type
                },
                attributes: {
                    exclude: this.unnecessaryAttributes
                }
            });

            return QUERIED_BADGES;
        }
        catch (err) {
            throw err;
        }
    }

    async findByName(name) {
        try {
            const QUERIED_BADGES = await BADGE.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`
                    }
                },
                attributes: {
                    exclude: this.unnecessaryAttributes
                }
            });

            return QUERIED_BADGES;
        }
        catch (err) {
            throw err;
        }
    }
};

module.exports = new BadgeDatabaseAdapter;