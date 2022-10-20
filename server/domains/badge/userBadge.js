class UserBadge {
    badge;
    score;
    rank;

    UserBadge() {
        this.badge = Badge();
        this.score = -1;
        rank = -1;
    }

    UserBadge(badge) {
        this.badge = badge;
        this.score = 0;
        this.rank = 0;
    }

    getBadge() {
        return this.badge;
    }

    getScore() {
        return this.score;
    }

    getRank() {
        return this.rank;
    }
    
    incrementScore(value) {
        this.score += value;

        let currentRank = this.score >= this.badge.getGoldScore() ? 3 : 
            this.score >= this.badge.getSilverScore() ? 2 :
            this.score >= this.badge.getBronzeScore() ? 1 :
            0;

        this.rank = currentRank;
    }








}