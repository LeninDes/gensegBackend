import express from 'express'
import { createPrg,deletePrg,getAllPrgs,updatePrg } from '../../controllers/formulario/preguntas';

const router = express.Router();

/** RUTAS REGISTRO Y LOGIN */
router.post('/Pregunta', createPrg);
router.get('/Pregunta', getAllPrgs);
router.put('/Pregunta/:id', updatePrg);
router.delete('/Pregunta/:id', deletePrg);

export default router;