/* IMPORTAMOS DE DOTENV */
import dotenv from 'dotenv';
dotenv.config()

/** IMPORTAMOS DE LIBRERIAS  */
import express from 'express';
const cors = require('cors')

/** IMPORTAMOS RUTAS DE ARCHIVOS */
import authRoutes from './routes/AuthRoutes'
import subUnidad from './routes/privilegios/subUnidad'
import Permisos from './routes/privilegios/permisos'
import Roles from './routes/privilegios/roles'
import De_permisos from './routes/privilegios/de_permisos'
import Usuarios from './routes/privilegios/usuarios'
import Form from './routes/project/form'
import Preguntas from './routes/project/preguntas/pregunta'
import Project from './routes/project/project'
import Actividad from './routes/project/actividades'
//--------------
// APP CON EXPRESS
const app = express()
app.use(express.json());

// CORS para el control del acceso a esta api
app.use(cors()); 

// RUTAS
app.use('/auth', authRoutes);
app.use('/api', subUnidad);
app.use('/api', Roles);
app.use('/api', Permisos);
app.use('/api', De_permisos);
app.use('/api/auth', Usuarios);
app.use('/api', Form);
app.use('/api/form', Preguntas);
app.use('/api/', Project);
app.use('/api/', Actividad);


export default app;