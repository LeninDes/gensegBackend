import express from 'express'
import { getQuestionsByFormActive, createProject, getActivitysByProject, getProjectBySubUnidad, getProjectByUserSubUnidad, getProjectAllBySubunidad} from '../../controllers/project/project';

const router = express.Router();

/** RUTAS REGISTRO Y LOGIN */
router.post('/project', createProject);
router.get('/project/form', getQuestionsByFormActive);
router.get('/project/graficos/:id', getProjectAllBySubunidad)
router.get('/project/:id', getActivitysByProject);
router.get('/project/subunidad/:id', getProjectBySubUnidad);
router.get('/project/user/:dni/:idsub', getProjectByUserSubUnidad);

export default router;