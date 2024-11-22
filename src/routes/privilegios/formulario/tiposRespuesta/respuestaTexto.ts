import express from 'express'
import { createRespuestaTexto,deleteRespuestaTexto,getAllRespuestaTexto,updateRespuestaTexto } from '../../../../controllers/privilegios/formulario/tiposRespuesta/respuestaTexto';

const router = express.Router();

/** RUTAS REGISTRO Y LOGIN */
router.post('/ResOpcText', createRespuestaTexto);
router.get('/ResOpcText', getAllRespuestaTexto);
router.put('/ResOpcText/:id', updateRespuestaTexto);
router.delete('/ResOpcText/:id', deleteRespuestaTexto);

export default router;