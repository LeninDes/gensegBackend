import express from 'express'
import {upload, createCarouselConfig, getCarouselConfig } from '../../controllers/pagina/pagina';

const router = express.Router();

/** RUTAS REGISTRO Y LOGIN */
router.post('/carrusel',upload.array('files'), createCarouselConfig);
router.get('/carrusel', getCarouselConfig);
router.get('/carrusel/:id', );
router.put('/carrusel/:id', );
router.delete('/carrusel/:id', );

export default router;