import express from 'express'
import { createUserWithHashedPasswordAndToken,loginUser } from '../../controllers/privilegios/usuarios';

const router = express.Router();

/** RUTAS REGISTRO Y LOGIN */
router.post('/register', createUserWithHashedPasswordAndToken);  // Registrar usuario
router.post('/login', loginUser);  // Iniciar sesión

export default router;