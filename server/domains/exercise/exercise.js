class Exercise {
    id;
    name;
    numSeries;
    numRepetitions;
    weight;
    type;

    Exercise() {
        this.id = -1;
        this.name = "";
        this.numSeries = -1;
        this.numRepetitions = -1;
        this.weight = -1;
        this.type = "";
    }

    Exercise(id, name, numSeries, numRepetitions, weight, type) {
        this.id = id;
        this.name = name;
        this.numSeries = numSeries;
        this.numRepetitions = numRepetitions;
        this.weight = weight;
        this.type = type;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getNumSeries() {
        return this.numSeries;
    }

    getNumRepetitions() {
        return this.numRepetitions;
    }

    getWeight() {
        return this.weight;
    }

    getType() {
        return this.type;
    }

    setId(id) {
        this.id = id;
    }

    setName(name) {
        this.name = name;
    }

    setNumSeries(numSeries) {
        this.numSeries = numSeries;
    }

    setNumRepetitions(numRepetitions) {
        this.numRepetitions = numRepetitions;
    }

    setWeight(weight) {
        this.weight = weight;
    }

    setType(type) {
        this.type = type;
    }
    
}