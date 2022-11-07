const Router = require('express').Router();

const QueryExerciseSheet = require('../../domains/exerciseSheet/exerciseSheetDomain');

Router.get('/', async (req, res, next) => {
    const USER_ID = req.userId;

    try {
        const EXERCISE_SHEETS = await QueryExerciseSheet.queryUserExerciseSheets(USER_ID);

        res.status(200).json({ data: EXERCISE_SHEETS });
    }
    catch(err) {
        next(err);
    }
});

Router.get('/available/:sheetId', async (req, res, next) => {
    const USER_ID = req.userId;
    let type = req.query.type;
    let sheetId = req.params.sheetId;

    try {
        const EXERCISE_SHEETS = await QueryExerciseSheet.queryAvailableExercisesSheet(USER_ID, sheetId, type);

        res.status(200).json({ data: EXERCISE_SHEETS });
    }
    catch(err) {
        next(err);
    } 
});

Router.post('/add/:sheetId', async (req, res, next) => {
    try {
        const EXERCISE_IDS = req.body.exercisesIds;
        const USER_ID = req.userId;
        const SHEET_ID = req.params.sheetId;
        await QueryExerciseSheet.createUserExercises(USER_ID, SHEET_ID, EXERCISE_IDS);

        res.status(201).send({
            data:{
                message:'Exercícios cadastrados em sua ficha com sucesso!'
            }
        });
    }
    catch(err) {
        next(err);
    }
});

Router.put('/:sheetId/update/:exerciseId', async (req, res, next) => {
    try {
        const USER_EXERCISE_INFO = req.body;
        const USER_EXERCISE_NAME = req.body.name;
        const SHEET_ID = req.params.sheetId;
        const USER_ID = req.userId;
        const EXERCISE_ID = req.params.exerciseId;

        let userExerciseIds = [];
        userExerciseIds['sheetId'] = SHEET_ID;
        userExerciseIds['userId'] = USER_ID;
        userExerciseIds['exerciseId'] = EXERCISE_ID; 
        
        const UPDATE_USER_EXERCISE = await QueryExerciseSheet.updateUserExerciseInfo(userExerciseIds, USER_EXERCISE_INFO);

        res.status(200).json({data: {
            ...UPDATE_USER_EXERCISE.dataValues,
            name: USER_EXERCISE_NAME
        } });
    }
    catch(err) {
        next(err);
    }
});

Router.delete('/:sheetId/delete/:exerciseId', async (req, res, next) => {
    try {
        const SHEET_ID = req.params.sheetId;
        const USER_ID = req.userId;
        const EXERCISE_ID = req.params.exerciseId;

        let userExerciseIds = [];
        userExerciseIds['sheetId'] = SHEET_ID;
        userExerciseIds['userId'] = USER_ID;
        userExerciseIds['exerciseId'] = EXERCISE_ID; 

        await QueryExerciseSheet.deleteUserExercise(userExerciseIds);

        res.status(200).send('Exercício de usuário excluído com sucesso.');
    }
    catch(err) {
        next(err);
    }
});

module.exports = Router;