import express from 'express'
import { upload, getDataActivities, createAnswersAndInsertActivity, probar, createAnswersAndInsertActivityNewFormData, getNumberEstatesActivities, updateAnswersAndActivity,deleteActivityAndResponses } from '../../controllers/project/actividad';

const router = express.Router();

/** RUTAS REGISTRO Y LOGIN */
router.post('/actividad/:id', upload.any(), createAnswersAndInsertActivityNewFormData);
router.get('/actividad/:id', getDataActivities);
//router.post('/actividad', createAnswersAndInsertActivity);
router.put('/actividad/:id', updateAnswersAndActivity);
router.delete('/actividad/:id', deleteActivityAndResponses);
router.get('/actividad/subunidad/:id',getNumberEstatesActivities);

export default router;