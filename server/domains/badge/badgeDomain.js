const queryBadges = require('../../gates/badge/badgeExitGate');

class QueryBadgeDomain {
    
    async queryAllBadges() {
        let queriedBadges = [];
        
        try {
            const badges = await queryBadges.getAllBadges();
            
            for (const badge of badges) {
                queriedBadges.push(badge);
            }
            
            return queriedBadges;
        }
        catch (err) {
            return err;
        }
    }
    
    async queryOneBadge(id) {
        let queriedBadges = [];

        try {
            const BADGE = await queryBadges.getOneBadge(id);

            queriedBadges.push(BADGE);
            
            return queriedBadges;
        } catch (err) {
            return err;
        }
    }
}

module.exports = new QueryBadgeDomain;