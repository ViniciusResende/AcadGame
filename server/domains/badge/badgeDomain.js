const QUERY_BADGES = require('../../gates/badge/badgeExitGate');

class BadgeDomain {
    
    async queryAllBadges() {
        try {
            const BADGES = await QUERY_BADGES.getAllBadges();
            
            return BADGES;
        }
        catch (err) {
            throw err;
        }
    }
    
    async queryOneBadge(id) {
        try {
            const BADGE = await QUERY_BADGES.getOneBadge(id);
            
            return BADGE;
        }
        catch (err) {
            throw err;
        }
    }

    async queryBadgesByType(type) {
        try {
            const BADGES = await QUERY_BADGES.getBadgesByType(type);

            return BADGES;
        }
        catch (err) {
            throw err;
        }
    }

    async queryBadgesByName(name) {
        try {
            const BADGES = await QUERY_BADGES.getBadgesByName(name);

            return BADGES;
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = new BadgeDomain;