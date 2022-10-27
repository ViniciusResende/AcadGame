const EXERCISE = require('../../infrastructure/models/exercise');

const { Op } = require('sequelize');

class ExerciseDatabaseAdapter {
    unnecessaryAttributes = ['createdAt', 'updatedAt'];
    
    async findAllExercises() {
        try {
            const ALL_EXERCISES = await EXERCISE.findAll({
                attributes: {
                    exclude: this.unnecessaryAttributes
                }
            });

            return ALL_EXERCISES;
        }
        catch(err) {
            return err;
        }
    }

    async findOneExercise(id) {
        try {
            const QUERIED_EXERCISE = await EXERCISE.findByPk(id, {
                attributes: {
                    exclude: this.unnecessaryAttributes
                }
            });

            if (!QUERIED_EXERCISE) {
                throw new Error(`Não encontramos um exercício com id ${id}`);
            }

            return QUERIED_EXERCISE;
        }
        catch (err) {
            return err;
        }
    }

    async findExerciseByType(type) {
        try {
            const QUERIED_EXERCISES = await EXERCISE.findAll({
                where: {
                    type: type
                },
                attributes: {
                    exclude: this.unnecessaryAttributes
                }
            });

            if(!QUERIED_EXERCISES) {
                throw new Error(`Não encontramos um exercício com o tipo ${type}.`)
            }
            
            return QUERIED_EXERCISES;
        }
        catch(err) {
            throw err;
        }
    }

    async findExercisesByName(name) {
        try {
            const QUERIED_EXERCISES = await EXERCISE.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`
                    }
                },
                attributes: {
                    exclude: this.unnecessaryAttributes
                }
            });

            if(!QUERIED_EXERCISES) {
                throw new Error(`Não encontramos nenhum exercício com nome semelhante a ${name}.`);
            }

            return QUERIED_EXERCISES;
        }
        catch(err) {
            throw err;
        }
    }
};

module.exports = new ExerciseDatabaseAdapter;