import express from 'express'
import { createUser,loginUser, AllUser } from '../../controllers/privilegios/usuarios';

const   router = express.Router();

/** RUTAS REGISTRO Y LOGIN */
router.post('/register', createUser);  // Registrar usuario
router.post('/login', loginUser);  // Iniciar sesión
router.get('/user', AllUser);
export default router;