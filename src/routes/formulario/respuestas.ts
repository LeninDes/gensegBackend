import express from 'express'
//import { createRes,deleteRes,getAllRes,updateRes } from '../../controllers/privilegios/formulario/respuestas';
import { createRes,deleteRes,getAllRes,updateRes } from '../../controllers/formulario/respuestas';

const router = express.Router();

/** RUTAS REGISTRO Y LOGIN */
router.post('/Respuesta', createRes);
router.get('/Respuesta', getAllRes);
router.put('/Respuesta/:id', updateRes);
router.delete('/Respuesta/:id', deleteRes);

export default router;