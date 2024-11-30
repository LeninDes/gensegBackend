import express from 'express'
import { createOpcMul,deleteOpcMul,getAllOpcMul,updateOpcMul } from '../../../controllers/formulario/iposPregunta/opcionMultiple';

const router = express.Router();

/** RUTAS REGISTRO Y LOGIN */
router.post('/OpcionMul', createOpcMul);
router.get('/OpcionMul', getAllOpcMul);
router.put('/OpcionMul/:id', updateOpcMul);
router.delete('/OpcionMul/:id', deleteOpcMul);

export default router;