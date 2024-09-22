/* IMPORTAMOS LAS LIBRERIAS */
import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import authRoutes from './routes/AuthRoutes'

// APP CON EXPRESS
const app = express()
app.use(express.json());


// RUTAS
app.use('/auth', authRoutes);
// AUTENTICACION

// Hacer una apirest de usuarios

console.log("Esto esta siendo ejecutado")

export default app;