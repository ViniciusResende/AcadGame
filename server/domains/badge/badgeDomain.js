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
}

module.exports = new BadgeDomain;