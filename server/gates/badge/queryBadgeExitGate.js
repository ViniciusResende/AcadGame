const BadgeDBAdapter = require('../../routes/badge/badgeDBAdapter');

class QueryBadgeDB {
    async getAllBadges() {
        try {
            let returnBadges = [];
            
            let queriedBadges = await BadgeDBAdapter.findAllBadges();
            
            for (const queriedBadge of queriedBadges) {
                returnBadges.push(queriedBadge.dataValues);
            }
            
            return returnBadges;
        }
        catch (err) {
            return err;
        }
    }
    
    async getOneBadge(id) {
        try {
            const QUERIED_BADGE = await BadgeDBAdapter.findOneBadge(id);
            
            return QUERIED_BADGE.dataValues;
        } catch (err) {
            return err;
        }
    }
}

module.exports = new QueryBadgeDB;