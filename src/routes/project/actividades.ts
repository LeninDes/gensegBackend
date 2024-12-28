import express from 'express'
import { createAnswersAndInsertActivity, probar, getNumberEstatesActivities, updateAnswersAndActivity,deleteActivityAndResponses } from '../../controllers/project/actividad';

const router = express.Router();

/** RUTAS REGISTRO Y LOGIN */
router.post('/actividad', createAnswersAndInsertActivity);
//router.post('/actividad', createAnswersAndInsertActivity);
router.put('/actividad/:id', updateAnswersAndActivity);
router.delete('/actividad', deleteActivityAndResponses);
router.get('/actividad/:id',getNumberEstatesActivities);

export default router;