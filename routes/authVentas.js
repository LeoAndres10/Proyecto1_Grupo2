import express from 'express';
import {db} from '../config/db.js';
import dotenv from 'dotenv';
dotenv.config();
const routerVentas= express.Router();
import { verifyToken } from '../middleware/verifyToken.js';
// CRUD Ventas
routerVentas.get('/api/ventas', verifyToken, async (req, res) => {
    const [rows] = await db.execute('SELECT * FROM ventas');
    if (!rows) {
    return res.status(500).json({status:500, message:'Error en la consulta...', data:null});

    }
    return res.status(200).json({status: 200, message: 'Ventas', Ventas:rows});
});

routerVentas.post('/api/ventas', verifyToken, async (req, res) => {
    const { fecha, vehiculo_id, cliente_id, vendedor_id, precio_total, impuestos } = req.body;
    const insertar = await db.execute('INSERT INTO ventas (fecha, vehiculo_id, cliente_id, vendedor_id, precio_total, impuestos) VALUES (?, ?, ?, ?, ?, ?)', [fecha, vehiculo_id, cliente_id, vendedor_id, precio_total, impuestos]);
    if (!insertar) {
    return res.status(500).json({status:500, message:'Error en la consulta al insertar', data:null});

    }
    return res.status(200).json({status:200, message: 'Venta registrada' });
});

export {routerVentas};