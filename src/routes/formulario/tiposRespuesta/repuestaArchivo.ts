import express from 'express'
import { createRespuestaArchivo,deleteRespuestaArchivo,getAllRespuestaArchivo,updateRespuestaArchivo } from '../../../controllers/formulario/tiposRespuesta/repuestaArchivo';

const router = express.Router();

/** RUTAS REGISTRO Y LOGIN */
router.post('/ResFile', createRespuestaArchivo);
router.get('/ResFile', getAllRespuestaArchivo);
router.put('/ResFile/:id', updateRespuestaArchivo);
router.delete('/ResFile/:id', deleteRespuestaArchivo);

export default router;