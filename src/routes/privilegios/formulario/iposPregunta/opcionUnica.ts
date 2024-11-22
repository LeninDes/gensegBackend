import express from 'express'
import { createOpcUni,deleteOpcUni,getAllOpcUni,updateOpcUni } from '../../../../controllers/privilegios/formulario/iposPregunta/opcionUnica';

const router = express.Router();

/** RUTAS REGISTRO Y LOGIN */
router.post('/OpcionUni', createOpcUni);
router.get('/OpcionUni', getAllOpcUni);
router.put('/OpcionUni/:id', updateOpcUni);
router.delete('/OpcionUni/:id', deleteOpcUni);

export default router;