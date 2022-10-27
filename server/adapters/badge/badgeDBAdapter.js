const BADGE = require('../../infrastructure/models/badge');

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
            return err;
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
                throw new Error(`Não encontramos uma insíngnia com id ${id}`);
            }

            return QUERIED_BADGE;
        } 
        catch (err) {
            return err;
        }
    }
};

module.exports = new BadgeDatabaseAdapter;