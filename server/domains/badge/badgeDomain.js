class Badge {
    id;
    name;
    icon;

    Badge(id, name, icon) {
        this.id = id;
        this.name = name;
        this.icon = icon;
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