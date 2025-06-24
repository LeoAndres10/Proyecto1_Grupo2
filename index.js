// Proyecto Backend Autolote - Estructura Base Completa
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

//Login
import {routerLogin} from './routes/authLogin.js';

app.use('/', routerLogin);

// Registro de usuario
import { routerRegistro } from './routes/authRegistro.js';

app.use('/', routerRegistro);

//CRUD VEHICULOS
import {routerVehiculos} from './routes/authVehiculos.js';

app.use('/', routerVehiculos);

//CRUD CLIENTES
import { routerClientes } from './routes/authClientes.js';

app.use('/', routerClientes)
;
//CRUD VENTAS
import { routerVentas } from './routes/authVentas.js';
app.use('/', routerVentas);


// API externa: Conversión de precios
import { routerConversor } from './routes/authConversor.js';
app.use('/', routerConversor);

app.listen(PORT, () => { 
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});
