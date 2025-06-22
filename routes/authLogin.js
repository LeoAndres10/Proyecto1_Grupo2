import jwt from'jsonwebtoken';
import express from 'express';
import {db} from '../config/db.js';
import bcrypt from 'bcrypt';
import { verifyToken } from '../middleware/verifyToken.js';

const routerLogin= express.Router();
import dotenv from 'dotenv';
dotenv.config();
// Inicio de sesión
routerLogin.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);

    if (rows.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });

    const validPassword = bcrypt.compareSync(password, rows[0].password);
    if (!validPassword) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: rows[0].id },process.env.SECRET_KEY, { expiresIn: '1h' });
    return res.json({ auth: true, token });
});

routerLogin.get('/api/users', verifyToken, async (req, res) => {
   
    const [rows] = await db.execute(`SELECT id,username FROM users`);
    if (!rows) {
    return res.status(500).json({status:500, message:'Error en la consulta', data:null});

    }
    
    res.status(200).json({status:200, message:'Success',data:rows});
});

routerLogin.get('/api/vehiculos', verifyToken, async (req, res) => {
    const [rows] = await db.execute('SELECT * FROM vehiculos');
    if (!rows) {
    return res.status(500).json({status:500, message:'Error en la consulta', data:null});

    }
    return res.status(200).json({status: 200, message: 'Success', data:rows });

});

routerLogin.get('/api/clientes', verifyToken, async (req, res) => {
    const [rows] = await db.execute('SELECT * FROM clientes');
    if (!rows) {
    return res.status(500).json({status:500, message:'Error en la consulta', data:null});

    }
    return res.status(200).json({status: 200, message: 'Success', data:rows });

});

export {routerLogin};


