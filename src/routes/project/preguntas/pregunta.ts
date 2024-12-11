import express from 'express'
import { createQuestion, getQuestionsByForm, handleDynamicQuestions } from '../../../controllers/project/preguntas/pregunta';

const router = express.Router();

/** RUTAS REGISTRO Y LOGIN */
router.post('/preguntas', handleDynamicQuestions);
router.get('/preguntas/:id', getQuestionsByForm);
router.put('/preguntas/:id', );
router.delete('/preguntas/:id', );

export default router;