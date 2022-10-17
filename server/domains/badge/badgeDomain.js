class Badge {
    id;
    name;
    url;

    Badge() {
        this.id = -1;
        this.name = "";
        this.url = "";
    }

    Badge(id, name, url) {
        this.id = id;
        this.name = name;
        this.url = url;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getUrl() {
        return this.url;
    }

}

module.exports = new Badge;