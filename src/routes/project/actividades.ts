import express from 'express'
import { createAnswersAndInsertActivity, createActivity } from '../../controllers/project/actividad';

const router = express.Router();

/** RUTAS REGISTRO Y LOGIN */
router.post('/actividad', createAnswersAndInsertActivity);
//router.post('/actividad', createAnswersAndInsertActivity);
router.put('/actividad/:id',);
router.delete('/actividad/:id',);

export default router;