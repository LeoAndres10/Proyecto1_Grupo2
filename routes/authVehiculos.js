
import express from'express';
import {db} from'../config/db.js';
import {verifyToken} from '../middleware/verifyToken.js';
const routerVehiculos= express.Router();
import dotenv from 'dotenv';
dotenv.config();
// CRUD Vehículos
routerVehiculos.get('/api/vehiculos', verifyToken, async (req, res) => {
    const id= req.body.id;
    const [rows] = await db.execute('SELECT * FROM vehiculos');
    if (!rows) {
    return res.status(500).json({status:500, message:'Error en la consulta', data:null});

    }
  
    return res.status(200).json({status: 200, message: 'Success', data:rows });

});

async function autoIncrementalId() {
    const [rows] = await db.execute('SELECT * FROM vehiculos');
    let lastId = rows.length>0 ? rows[rows.length-1].id : 0;
    let newId = lastId+1;
    return newId;
}
 
routerVehiculos.post('/api/vehiculos', verifyToken, async (req, res) => {
    const { id,marca, modelo, anio, precio, disponible } = req.body;
    const vehiculo= await db.execute('INSERT INTO vehiculos (marca, modelo, anio, precio, disponible) VALUES (?, ?, ?, ?, ?)', [marca, modelo, anio, precio, disponible]);
    if (!vehiculo) {
           return res.status(500).json({status:500, message:'Error en la consulta al ingresar...', data:null});

    }

      id = autoIncrementalId();
    return res.status(200).json({status: 200, message: 'Vehículo agregado', vehiculo:vehiculo });
});

routerVehiculos.put('/api/vehiculos/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { marca, modelo, anio, precio, disponible } = req.body;
    const actualizar =await db.execute('UPDATE vehiculos SET marca = ?, modelo = ?, anio = ?, precio = ?, disponible = ? WHERE id = ?', [marca, modelo, anio, precio, disponible, id]);
    if (!actualizar) {
   return res.status(500).json({status:500, message:'Error en la consulta al actualizar...', data:null});

    }
    return res.status(200).json({status:200, message: 'Vehículo actualizado', actualizar:actualizar });
});

routerVehiculos.delete('/api/vehiculos/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const eliminar =await db.execute('DELETE FROM vehiculos WHERE id = ?', [id]);
    if (!eliminar) {    
     return res.status(500).json({status:500, message:'Error en la consulta al borrar', data:null});

    }
    res.status(200).json({status:200, message: 'Vehículo eliminado' });
});

export {routerVehiculos};