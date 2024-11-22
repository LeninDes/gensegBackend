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
import Form from './routes/formulario/form'
///importando Rutas de archivos de formulario
import PREGUNTAS from './routes/privilegios/formulario/preguntas'
import RESPUESTAS from './routes/privilegios/formulario/respuestas'
//--- tipo preguntas
import OPCION_MULTIPLE from './routes/privilegios/formulario/iposPregunta/opcionMultiple'
import OPCION_DESPLEGABLE from './routes/privilegios/formulario/iposPregunta/opcionDesplegable'
import OPCION_UNICA from './routes/privilegios/formulario/iposPregunta/opcionUnica'
///----tipo respuestas
import RES_ARCHIVO from './routes/privilegios/formulario/tiposRespuesta/repuestaArchivo'
import RES_FECHA from './routes/privilegios/formulario/tiposRespuesta/respuestaFecha'
import RES_OPC_DESPLEGABLE from './routes/privilegios/formulario/tiposRespuesta/respuestaOpcionDesplegable'
import RES_OPC_MULTIPLE from './routes/privilegios/formulario/tiposRespuesta/respuestaOpcionMultiple'
import RES_OPC_UNICA from './routes/privilegios/formulario/tiposRespuesta/respuestaOpcionUnica'
import RES_TEXTO from './routes/privilegios/formulario/tiposRespuesta/respuestaTexto'
//--------------
// APP CON EXPRESS
const app = express()
app.use(express.json());

// CORS
app.use(cors()); 

// RUTAS
app.use('/auth', authRoutes);
//app.use('/api', roleRoutes);
//app.use('/api', permission);
app.use('/api', subUnidad);
app.use('/api', Roles);
app.use('/api', Permisos);
app.use('/api', De_permisos);
app.use('/api/auth', Usuarios);
//API para formularios
app.use('/api/', Form)
//app.use('/api' )
//API para editar Formulario
app.use('/api/', PREGUNTAS);
app.use('/api/', RESPUESTAS);
//---tipos preguntas
app.use('/api/', OPCION_DESPLEGABLE);
app.use('/api/', OPCION_MULTIPLE);
app.use('/api/', OPCION_UNICA);
//---tipos Respuestas
app.use('/api/', RES_ARCHIVO);
app.use('/api/', RES_FECHA);
app.use('/api/', RES_OPC_DESPLEGABLE);
app.use('/api/', RES_OPC_MULTIPLE);
app.use('/api/', RES_OPC_UNICA);
app.use('/api/', RES_TEXTO);


export default app;