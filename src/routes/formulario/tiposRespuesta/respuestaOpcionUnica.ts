import express from 'express'
import { createResOU,deleteResOU,getAllResOU,updateResOU } from '../../../controllers/formulario/tiposRespuesta/respuestaOpcionUnica';

const router = express.Router();

/** RUTAS REGISTRO Y LOGIN */
router.post('/ResOpcUni', createResOU);
router.get('/ResOpcUni', getAllResOU);
router.put('/ResOpcUni/:id', updateResOU);
router.delete('/ResOpcUni/:id', deleteResOU);

export default router;