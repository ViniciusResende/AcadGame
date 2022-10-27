const BADGE_DB_ADAPTER = require('../../adapters/badge/badgeDBAdapter');

class QueryBadgeDB {
    async getAllBadges() {
        let returnBadges = [];

        try {
            const QUERIED_BADGES = await BADGE_DB_ADAPTER.findAllBadges();
            
            QUERIED_BADGES.forEach( queriedBadge => {
                returnBadges.push(queriedBadge.dataValues);
            });
            
            return returnBadges;
        }
        catch (err) {
            return err;
        }
    }
    
    async getOneBadge(id) {
        try {
            const QUERIED_BADGE = await BADGE_DB_ADAPTER.findOneBadge(id);
            
            return QUERIED_BADGE.dataValues;
        } catch (err) {
            return err;
        }
    }
}

module.exports = new QueryBadgeDB;