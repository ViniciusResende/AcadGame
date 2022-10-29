const Router = require('express').Router();

const QueryExerciseSheet = require('../../domains/exerciseSheet/exerciseSheetDomain');

Router.get('/', async (req, res) => {
    let userId = req.query.userID; // TODO: pegar do JWT

    try {
        const EXERCISE_SHEETS = await QueryExerciseSheet.queryUserExerciseSheets(userId);

        res.status(200).json(EXERCISE_SHEETS);
    }
    catch(err) {
        res.status(500).send(err.message);
    }
});

Router.get('/:numSheet', async (req, res) => {
    let userId = req.query.userID;
    let numSheet = req.params.numSheet;

    try {
        const EXERCISE_SHEET = await QueryExerciseSheet.queryOneExerciseSheet(userId, numSheet);

        res.status(200).json(EXERCISE_SHEET);
    }
    catch(err) {
        res.status(500).send(err.message);
    } 
});

Router.post('/', async (req, res) => {
    try {
        const USER_EXERCISES_INFO = req.body;
        await QueryExerciseSheet.createUserExercises(USER_EXERCISES_INFO);

        res.status(200).send('Exercícios cadastrados em sua ficha com sucesso!');
    }
    catch(err) {
        res.status(500).send(err.message);
    }
});

Router.put('/', async (req, res) => {
    try {
        let userExerciseInfo = req.body;
        const USER_EXERCISE_ID = req.body.id;
        delete userExerciseInfo.id;
        
        await QueryExerciseSheet.updateUserExerciseInfo(USER_EXERCISE_ID, userExerciseInfo);

        res.status(200).send('Exercício de usuário atualizado com sucesso!');
    }
    catch(err) {
        res.status(500).send(err.message);
    }
});

Router.delete('/', async (req, res) => {
    try {
        let userExerciseId = req.query.id;

        await QueryExerciseSheet.deleteUserExercise(userExerciseId);

        res.status(200).send('Exercício de usuário excluído com sucesso.');
    }
    catch(err) {
        res.status(500).send(err.message);
    }
});

module.exports = Router;