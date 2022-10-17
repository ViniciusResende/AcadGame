const queryBadgeDomain = require('../../domains/badge/queryBadgeDomain');

class QueryBadge {
    async searchAllBadges() {
        try {
            return await queryBadgeDomain.queryAllBadges();
        }
        catch (err) {
            return err;
        }
    }

    async getOneBadge(id) {
        try {
            return await queryBadgeDomain.queryOneBadge(id);
        } catch (err) {
            return err;
        }
    }
}

module.exports = new QueryBadge;