import express from 'express';
import { nuevoPermiso, obtenerPermisos, obtenerPermiso, actualizarPermiso, eliminarPermiso } from '../controllers/PermissionController'

const router = express.Router();

// Rutas CRUD para permisos
router.post('/permissions', nuevoPermiso);           // Crear nuevo permiso
router.get('/permissions', obtenerPermisos);         // Obtener todos los permisos
router.get('/permissions/:id', obtenerPermiso);      // Obtener un permiso por ID
router.put('/permissions/:id', actualizarPermiso);   // Actualizar un permiso
router.delete('/permissions/:id', eliminarPermiso);  // Eliminar un permiso

export default router;
