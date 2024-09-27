/* IMPORTAMOS DE DOTENV */
import dotenv from 'dotenv';
dotenv.config()

/** IMPORTAMOS DE LIBRERIAS  */
import express from 'express';
const cors = require('cors')

/** IMPORTAMOS RUTAS DE ARCHIVOS */
import authRoutes from './routes/AuthRoutes'
import roleRoutes from './routes/RoleRoutes'
import permission from './routes/PermissionRoutes'

// APP CON EXPRESS
const app = express()
app.use(express.json());

// CORS
app.use(cors()); 

// RUTAS
app.use('/auth', authRoutes);
app.use('/api', roleRoutes);
app.use('/api', permission)

// AUTENTICACION


// Hacer una apirest de usuarios

console.log("Esto esta siendo ejecutado")

export default app;