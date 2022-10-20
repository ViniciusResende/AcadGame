class User {
    id;
    name;
    score;
    exercises = [];
    badgesScore = [];

    User() {
        this.id = -1;
        this.name = "";
        this.score = -1;
    }

    User(id, name, score) {
        this.id = id;
        this.name = name;
        this.score = score;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getScore() {
        return this.score;
    }

    setId(id) {
        this.id = id;
    }

    setName(name) {
        this.id = name;
    }

    setScore(score) {
        this.id = score;
    }

    incrementScore(value) {
        this.score += value;
    }

    addExercise(exercise) {
        this.exercises.push(exercise);
    }

    getExercise(id) {
        let found = null;
        this.exercises.forEach(exercise => {
            if(exercise.id === id) {
                found = exercise;
                return;
            }
        })

        return found;
    }

    removeExercise(id) {
        let found = null;
        let index = 0;
        this.exercises.forEach(exercise => {
            index++;
            if(exercise.id === id) {
                found = exercise;
                this.exercises.splice(index, index);
                return;
            }
        })

        return found;
    }

    getAllExercises() {
        return this.exercises;
    }
}