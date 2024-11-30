import express from 'express'
import { createResOD,deleteResOD,getAllResOD,updateResOD } from '../../../controllers/formulario/tiposRespuesta/respuestaOpcionDesplegable';

const router = express.Router();

/** RUTAS REGISTRO Y LOGIN */
router.post('/ResOpcDes', createResOD);
router.get('/ResOpcDes', getAllResOD);
router.put('/ResOpcDes/:id', updateResOD);
router.delete('/ResOpcDes/:id', deleteResOD);

export default router;