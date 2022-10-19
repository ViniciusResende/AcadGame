class Badge {
    id;
    name;
    iconUrl;
    bronzeScore;
    silverScore;
    goldScore;

    Badge() {
        this.id = -1;
        this.name = "";
        this.iconUrl = "";
        this.bronzeScore = -1;
        this.silverScore = -1;
        this.goldScore = -1;
    }

    Badge(id, name, iconUrl, bronzeScore) {
        this.id = id;
        this.name = name;
        this.iconUrl = iconUrl;
        this.bronzeScore = bronzeScore;
        this.silverScore = bronzeScore * 2;
        this.goldScore = bronzeScore * 4;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getIconUrl() {
        return this.iconUrl;
    }

    getBronzeScore() {
        return this.bronzeScore;
    }

    getSilverScore() {
        return this.silverScore;
    }

    getGoldScore() {
        return this.goldScore;
    }

    setId(id) {
        this.id = id;
    }

    setName(name) {
        this.name = name;
    }

    setIconUrl(iconUrl) {
        this.iconUrl = iconUrl;
    }

    setBronzeScore(bronzeScore) {
        this.bronzeScore = bronzeScore;
    }

    setSilverScore(silverScore) {
        this.silverScore = silverScore;
    }

    setGoldScore(goldScore) {
        this.goldScore = goldScore;
    }



}