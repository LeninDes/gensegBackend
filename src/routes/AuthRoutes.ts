import express from 'express'
import { register } from '../controllers/authController';

const router = express.Router();

/** RUTAS REGISTRO Y LOGIN */
router.post('/register', register)
router.post('/login')




export default router;