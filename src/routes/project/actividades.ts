import express from 'express'
import {getAllNumberAtcivity, upload, getDataActivities, updateAnswersAndActivityData, createAnswersAndInsertActivity, probar, createAnswersAndInsertActivityNewFormData, getNumberEstatesActivities, updateAnswersAndActivity,deleteActivityAndResponses } from '../../controllers/project/actividad';

const router = express.Router();

/** RUTAS REGISTRO Y LOGIN */
router.post('/actividad/:id', upload.any(), createAnswersAndInsertActivityNewFormData);
router.put('/actividad/:id', upload.any(), updateAnswersAndActivityData);
router.get('/actividad/:id', getDataActivities);
//router.post('/actividad', createAnswersAndInsertActivity);
router.delete('/actividad/:id', deleteActivityAndResponses);
router.get('/actividad/subunidad/:id',getNumberEstatesActivities);
router.get('/actividad/', getAllNumberAtcivity);

export default router;