import express from 'express'
import {createForm, getAllForms, updateForm,deleteForm } from '../../controllers/formulario/formulario';

const router = express.Router();

/** RUTAS REGISTRO Y LOGIN */
router.post('/form', createForm);
router.get('/form', getAllForms);
router.put('/form/:id', updateForm );
router.delete('/form/:id',deleteForm );

export default router;