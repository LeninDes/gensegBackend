import express from 'express'
import { getQuestionsByFormActive } from '../../controllers/project/project';

const router = express.Router();

/** RUTAS REGISTRO Y LOGIN */
router.post('/project', );
router.get('/project/form', getQuestionsByFormActive);
router.put('/project/:id', );
router.delete('/project/:id', );

export default router;