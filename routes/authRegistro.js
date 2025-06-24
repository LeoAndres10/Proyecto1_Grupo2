
import express from 'express';
import {db} from '../config/db.js';
import bcrypt from 'bcrypt';
const routerRegistro= express.Router();
import dotenv from 'dotenv';
import { verifyToken } from '../middleware/verifyToken.js';
dotenv.config();

// Registro de usuario

routerRegistro.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

   const usuario= await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
    if (!usuario) {
      return res.status(500).json({status:500, message:'Error al insertar usuario...', data:null});

    }

    return res.json({ message: 'Usuario registrado correctamente' });
});


routerRegistro.get('/api/register',verifyToken, async (req, res) => {

const [usuarios]= await db.execute('SELECT * FROM users');
if (!usuarios) {
   return res.status(500).json({status:500, message:'Error al consultar...', data:null});

}
return res.status(200).json({status:200,message:'Lista de usuarios', data:usuarios});
});

export {routerRegistro};
