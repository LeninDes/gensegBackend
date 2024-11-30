import express from 'express'
//import { createResOM,deleteResOM,getAllResOM,updateResOM } from '../../../../controllers/privilegios/formulario/tiposRespuesta/respuestaOpcionMultiple';
import { createResOM,deleteResOM,getAllResOM,updateResOM } from '../../../../controllers/formulario/tiposRespuesta/respuestaOpcionMultiple';

const router = express.Router();

/** RUTAS REGISTRO Y LOGIN */
router.post('/ResOpcMul', createResOM);
router.get('/ResOpcMul', getAllResOM);
router.put('/ResOpcMul/:id', updateResOM);
router.delete('/ResOpcMul/:id', deleteResOM);

export default router;