// Proyecto Backend Autolote - Estructura Base Completa

import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import { get } from 'axios';

const app = express();
const PORT = 5000;
const SECRET_KEY = 'clave_secreta_super_segura'; // Cambia esta clave
const EXCHANGE_API_BASE = 'https://api.exchangerate-api.com/v4/latest';

app.use(cors());
app.use(express.json());

// Conexión a MySQL
const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'autolote'
});

// Middleware para verificar token JWT
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'Token requerido' });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Token inválido' });
        req.userId = decoded.id;
        next();
    });
}

// Registro de usuario
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

    res.json({ message: 'Usuario registrado correctamente' });
});

// Inicio de sesión
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);

    if (rows.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });

    const validPassword = bcrypt.compareSync(password, rows[0].password);
    if (!validPassword) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: rows[0].id }, SECRET_KEY, { expiresIn: 86400 });
    res.json({ auth: true, token });
});

// CRUD Vehículos
app.get('/api/vehiculos', verifyToken, async (req, res) => {
    const [rows] = await db.execute('SELECT * FROM vehiculos');
    res.json(rows);
});

app.post('/api/vehiculos', verifyToken, async (req, res) => {
    const { marca, modelo, anio, precio, disponible } = req.body;
    await db.execute('INSERT INTO vehiculos (marca, modelo, anio, precio, disponible) VALUES (?, ?, ?, ?, ?)', [marca, modelo, anio, precio, disponible]);
    res.json({ message: 'Vehículo agregado' });
});

app.put('/api/vehiculos/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { marca, modelo, anio, precio, disponible } = req.body;
    await db.execute('UPDATE vehiculos SET marca = ?, modelo = ?, anio = ?, precio = ?, disponible = ? WHERE id = ?', [marca, modelo, anio, precio, disponible, id]);
    res.json({ message: 'Vehículo actualizado' });
});

app.delete('/api/vehiculos/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    await db.execute('DELETE FROM vehiculos WHERE id = ?', [id]);
    res.json({ message: 'Vehículo eliminado' });
});

// CRUD Clientes
app.get('/api/clientes', verifyToken, async (req, res) => {
    const [rows] = await db.execute('SELECT * FROM clientes');
    res.json(rows);
});

app.post('/api/clientes', verifyToken, async (req, res) => {
    const { nombre, apellido, correo, telefono, direccion } = req.body;
    await db.execute('INSERT INTO clientes (nombre, apellido, correo, telefono, direccion) VALUES (?, ?, ?, ?, ?)', [nombre, apellido, correo, telefono, direccion]);
    res.json({ message: 'Cliente agregado' });
});

// CRUD Ventas
app.get('/api/ventas', verifyToken, async (req, res) => {
    const [rows] = await db.execute('SELECT * FROM ventas');
    res.json(rows);
});

app.post('/api/ventas', verifyToken, async (req, res) => {
    const { fecha, vehiculo_id, cliente_id, vendedor_id, precio_total, impuestos } = req.body;
    await db.execute('INSERT INTO ventas (fecha, vehiculo_id, cliente_id, vendedor_id, precio_total, impuestos) VALUES (?, ?, ?, ?, ?, ?)', [fecha, vehiculo_id, cliente_id, vendedor_id, precio_total, impuestos]);
    res.json({ message: 'Venta registrada' });
});

// API externa: Conversión de precios
app.get('/api/convertir/:moneda', verifyToken, async (req, res) => {
    try {
        const { moneda } = req.params;
        const [vehiculos] = await db.execute('SELECT * FROM vehiculos');

        const response = await get(`${EXCHANGE_API_BASE}/USD`);
        const rates = response.data.rates;

        if (!rates[moneda]) return res.status(400).json({ message: 'Moneda no soportada' });

        const vehiculosConvertidos = vehiculos.map(v => {
            return {
                ...v,
                precio_convertido: (v.precio * rates[moneda]).toFixed(2),
                moneda: moneda
            };
        });

        res.json({ vehiculos: vehiculosConvertidos, tasaCambio: rates[moneda] });
    } catch (error) {
        res.status(500).json({ message: 'Error al convertir precios', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});
