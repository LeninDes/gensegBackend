import express from 'express'
import { createOpcDes,deleteOpcDes,getAllOpcDes,updateOpcDes } from '../../../../controllers/privilegios/formulario/iposPregunta/opcionDesplegable';

const router = express.Router();

/** RUTAS REGISTRO Y LOGIN */
router.post('/OpcionDes', createOpcDes);
router.get('/OpcionDes', getAllOpcDes);
router.put('/OpcionDes/:id', updateOpcDes);
router.delete('/OpcionDes/:id', deleteOpcDes);

export default router;