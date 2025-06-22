import jwt from'jsonwebtoken';
import express from 'express';
import {db} from '../config/db.js';
import bcrypt from 'bcrypt';
const routerClientes= express.Router();
import dotenv from 'dotenv';
import { verifyToken } from '../middleware/verifyToken.js';
dotenv.config();
// CRUD Clientes
routerClientes.get('/api/clientes', verifyToken, async (req, res) => {
    const [rows] = await db.execute('SELECT * FROM clientes');
    if (!rows) {
    return res.status(500).json({status:500, message:'Error en la consulta', data:null});

    }
    return res.status(200).json(rows);
});

routerClientes.get('/api/clientes/:id', verifyToken, async (req, res) => {
    const id = req.params.id;
    const [rows] = await db.execute(`SELECT * FROM clientes where id = ${id}`);
    if (!rows) {
    return res.status(500).json({status:500, message:'Error en la consulta', data:null});

    }
    return res.status(200).json(rows);
});

routerClientes.post('/api/clientes', verifyToken, async (req, res) => {
    const { nombre, apellido, correo, telefono, direccion } = req.body;
    const insertar = await db.execute('INSERT INTO clientes (nombre, apellido, correo, telefono, direccion) VALUES (?, ?, ?, ?, ?)', [nombre, apellido, correo, telefono, direccion]);
    if (!insertar) {
   return res.status(500).json({status:500, message:'Error en la consulta...', data:null});

    }
    res.status(200).json({status: 200, message: 'Cliente agregado' });
});

export {routerClientes};