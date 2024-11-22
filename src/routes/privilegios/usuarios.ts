import express from 'express'
import { createUser,loginUser, AllUser, getUserwithDNI } from '../../controllers/privilegios/usuarios';

const   router = express.Router();

/** RUTAS REGISTRO Y LOGIN */
router.post('/register', createUser);  // Registrar usuario
router.post('/login', loginUser);  // Iniciar sesión
router.get('/user', AllUser);
router.get('/user/:dni',getUserwithDNI);

export default router;