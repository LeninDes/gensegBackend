import express from 'express'
import { upload, deleteProject, updateProject, getQuestionsByFormActive, createProject, getActivitysByProject, getProjectBySubUnidad, getProjectStates,  getActivitiesAllBySubunidad, getProjectByUserSubUnidad, getProjectAllBySubunidad} from '../../controllers/project/project';

const router = express.Router();

/** RUTAS REGISTRO Y LOGIN */
router.post('/project', upload.single('file'), createProject);
router.get('/project/form', getQuestionsByFormActive);
router.get('/project/graficos/:id', getActivitiesAllBySubunidad);
router.get('/project/dona/:id', getProjectStates);
router.put('/project/:id', updateProject);
router.delete('/project',deleteProject);
//router.get('/project/graficos/:id', getProjectAllBySubunidad);
router.get('/project/:id', getActivitysByProject);
router.get('/project/subunidad/:id', getProjectBySubUnidad);
router.get('/project/user/:dni/:idsub', getProjectByUserSubUnidad);

export default router;