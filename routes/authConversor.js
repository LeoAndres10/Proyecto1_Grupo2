import express from 'express';

import {db} from '../config/db.js';
import { verifyToken } from '../middleware/verifyToken.js';
const routerConversor = express.Router();
const EXCHANGE_API_BASE = 'https://api.exchangerate-api.com/v4/latest';
import axios from 'axios';

// API externa: Conversión de precios

routerConversor.get('/api/convertir/:moneda', verifyToken, async (req, res) => {
    try {
        const { moneda } = req.params; 
        const [vehiculos] = await db.execute('SELECT * FROM vehiculos');

        const response = await axios.get(`${EXCHANGE_API_BASE}/USD`);
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

export {routerConversor};
