import express from 'express'
import { getQuestionsByFormActive, createProject, getActivitysByProject} from '../../controllers/project/project';

const router = express.Router();

/** RUTAS REGISTRO Y LOGIN */
router.post('/project', createProject);
router.get('/project/form', getQuestionsByFormActive);
router.get('/project/:id', getActivitysByProject);
router.delete('/project/:id', );

export default router;