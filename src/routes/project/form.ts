import express from 'express'
import { createForm, getAllFormsBySubUnidad, deleteForm, getAllForms, updateForm } from '../../controllers/project/formulario';

const router = express.Router();

/** RUTAS REGISTRO Y LOGIN */
router.post('/form', createForm);
router.get('/form', getAllForms);
router.get('/form/:id', getAllFormsBySubUnidad);
router.put('/form/:id', updateForm);
router.delete('/form/:id', deleteForm);

export default router;