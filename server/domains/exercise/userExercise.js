class UserExercise {
    id;
    exercise;
    numSeries;
    numRepetitions;
    weight;

    UserExercise() {
        this.id = id;
        this.exercise = Exercise();
        this.numSeries = -1;
        this.numRepetitions = -1;
        this.weight = -1; 
    }

    UserExercise(exercise, numSeries, numRepetitions, weight) {
        this.id = id;
        this.exercise = exercise;
        this.numSeries = numSeries;
        this.numRepetitions = numRepetitions;
        this.weight = weight;
    }

    getId() {
        return this.id;
    }

    getExercise() {
        return this.exercise;
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

    setId(id) {
        this.id = id;
    }

    setExercise(exercise) {
        this.exercise = exercise;
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

}