import express from 'express'
import { createRespuestaFecha,deleteRespuestaFecha,getAllRespuestaFecha,updateRespuestaFecha } from '../../../controllers/formulario/tiposRespuesta/respuestaFecha';

const router = express.Router();

/** RUTAS REGISTRO Y LOGIN */
router.post('/ResDate', createRespuestaFecha);
router.get('/ResDate', getAllRespuestaFecha);
router.put('/ResDate/:id', updateRespuestaFecha);
router.delete('/ResDate/:id', deleteRespuestaFecha);

export default router;