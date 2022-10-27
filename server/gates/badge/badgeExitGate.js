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
            throw err;
        }
    }
    
    async getOneBadge(id) {
        try {
            const QUERIED_BADGE = await BADGE_DB_ADAPTER.findOneBadge(id);
            
            return QUERIED_BADGE.dataValues;
        } 
        catch (err) {
            throw err;
        }
    }

    async getBadgesByType(type) {
        let returnBadges = [];
        try {
            const QUERIED_BADGES = await BADGE_DB_ADAPTER.findByType(type);
    
            QUERIED_BADGES.forEach( badge => {
                returnBadges.push(badge.dataValues);
            });
            
            return returnBadges;
        }
        catch (err) {
            throw err;
        }
    }

    async getBadgesByName(name) {
        let returnBadges = [];
        try {
            const QUERIED_BADGES = await BADGE_DB_ADAPTER.findByName(name);
    
            QUERIED_BADGES.forEach( badge => {
                returnBadges.push(badge.dataValues);
            });
            
            return returnBadges;
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = new QueryBadgeDB;