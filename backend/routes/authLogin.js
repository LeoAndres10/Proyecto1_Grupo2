import jwt from'jsonwebtoken';
import express from 'express';

import bcrypt from 'bcrypt';
import { verifyToken } from '../middleware/verifyToken.js';
import axios from 'axios';
 import {Op, where} from 'sequelize';
const routerLogin= express.Router();
import dotenv from 'dotenv';
import Usuario from '../Modelos/Usuario.js';
import Repuesto from '../Modelos/Repuesto.js';
import Vehiculo from '../Modelos/Vehiculo.js';
import Venta from '../Modelos/Venta.js';
import Cliente from '../Modelos/Cliente.js';
import RegistroCompra from '../Modelos/RegistroCompra.js';
dotenv.config();
const EXCHANGE_API_BASE = 'https://api.exchangerate-api.com/v4/latest';

// Inicio de sesión
routerLogin.post('/api/login', async (req, res) => {

    try {
    const { Nombre } = req.body;
    const {Password}=req.body;
    const User = await Usuario.findOne({ where: { Nombre} });
   
    if (User) {
    const passwordUsuario = await bcrypt.compare(Password,User.Password);
  
    if(passwordUsuario){
    const tokenA = jwt.sign({ id: User.id, Nombre: User.Nombre },process.env.SECRET_KEY, {
      expiresIn: '1h'
    });
    if(tokenA){
        return res.json({success:true, user: true, message: 'Login exitoso' , token:tokenA ,data:User });
    
        }else{
            return res.status(401).json({ message: 'Contraseña incorrecta', data:User });
        } 
    }else{
    return res.status(403).json({ success:false, message: 'Usuarios no encontrado', data:User });
    }  
    
    }else{
  return res.status(404).json({ success:false, message: 'Usuario no encontrado', data:User });

    }
    } catch (error) {
    res.status(500).json({ error: 'Error del servidor' + error.message });
  }
});

routerLogin.get('/api/users', verifyToken, async (req, res) => {
   try {
    
    const User = await Usuario.findAll();
    if (!User) {
    return res.status(500).json({status:500, message:'Error en la consulta', data:null});

    }
    
     return res.status(200).json({status:200, message:'Success',data:User});
   } catch (error) {
    console.log(error);
   }
   
});

routerLogin.get('/api/repuestos', verifyToken,async (req, res) => {
   try {
    
   
const queryParam = req.query.q;

  if (!queryParam) {
    return res.status(400).json({ error: 'Parámetro "q" es requerido' });
  }

  const query = queryParam.toLowerCase();
   
    const repuesto = await Repuesto.findAll({where:{Nombre:{[Op.like]:`%${query}%`}}
    });
    if (!repuesto) {
    return res.status(500).json({status:500, message:'Error en la consulta', data:null});

    }
    
     return res.status(200).json(repuesto);
      
  } catch (error) {
    console.error('Error en la consulta:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
   } 
});

routerLogin.get('/api/repuestos/todos', verifyToken, async (req, res) => {
  try {
    

    const repuesto= await Repuesto.findAll();
    if (!repuesto) {
    return res.status(500).json({status:500, message:'Error en la consulta', data:null});

    }
    return res.status(200).json({data:repuesto});
} catch (error) {
    console.log(error);
  }
});


  routerLogin.post('/api/users', verifyToken, async (req, res) => {

   try{
    const { Nombre } = req.body;
    const {Password} = req.body;

    // Validación básica
    if (!Nombre || !Password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Hashear la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(Password, saltRounds);

    
    const newUsuario = await Usuario.create({
      Nombre,
      Password: hashedPassword
      
    });


    res.status(201).json({
      message: 'Usuario creado correctamente',
      data: {
        id: newUsuario.id,
        Nombre: newUsuario.Nombre
       
      }
    });
  
  } catch (error) {
    console.error('Error al crear Usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

routerLogin.post('/api/repuestos/registrar', verifyToken,async (req, res) => {

   try{
    const {Codigo,Nombre,Marca, Cantidad, Precio, Estante } = req.body;

  
    
    const newRepuesto = await Repuesto.create({
      Codigo,
      Nombre,
      Marca,
      Cantidad,
      Precio,
      Estante
      
      
    });


     return res.status(201).json({
      message: 'Usuario creado correctamente',
      data: newRepuesto 
    });
  
  } catch (error) {
    console.error('Error al crear Usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
routerLogin.post('/api/repuestos/inventario/agregar', verifyToken,async (req, res) => {

   try{
    const {Codigo,Nombre,Marca, Cantidad, Precio, Total } = req.body;

  
    
    const newInventario = await VentaRepuesto.create({
      Codigo,
      Nombre,
      Marca,
      Cantidad,
      Precio,
      Total
      
      
    });


     return res.status(201).json({
      message: 'Usuario creado correctamente',
      data: newInventario 
    });
  
  } catch (error) {
    console.error('Error al crear Usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
routerLogin.put('/api/repuestos/actualizar/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { Codigo,Nombre,Marca,Cantidad, Precio, Estante } = req.body;
    const actualizar =await Repuesto.findByPk(id);
    if (actualizar) {
      if (Codigo !== undefined) actualizar.Codigo = Codigo;
      if (Nombre !== undefined) actualizar.Nombre = Nombre;
      if (Marca !== undefined) actualizar.Marca = Marca;
      if (Cantidad !== undefined) actualizar.Cantidad = Cantidad;
      if (Precio !== undefined) actualizar.Precio = Precio;
      if (Estante !== undefined) actualizar.Estante = Estante;
      
      await actualizar.save();
    }
    return res.status(200).json({status:200, message: 'Repuesto actualizado' });

    
});
routerLogin.delete('/api/repuestos/eliminar/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const encontrar =await Repuesto.findByPk(id);
    if (!encontrar) {
    return res.status(403).json({status:403, message:'No se encontró id', data:null});
    }else{
       await encontrar.destroy();
    
    return res.status(200).json({status:200, message: 'Repuesto eliminado' });
    }
    
});


routerLogin.get('/api/vehiculos', verifyToken, async (req, res) => {
    const vehiculo =await Vehiculo.findAll();
    if (!vehiculo){
    return res.status(500).json({status:500, message:'Error en la consulta', data:null});

    }
    return res.status(200).json({status: 200, message: 'Success', data:vehiculo });

});
routerLogin.get('/api/convertir/:moneda', verifyToken, async (req, res) => {
    try {
        const { moneda } = req.params; 
        const vehiculos = await Vehiculo.findAll();

        const response = await axios.get(`${EXCHANGE_API_BASE}/USD`);
        const rates = response.data.rates;

        if (!rates[moneda]) return res.status(400).json({ message: 'Moneda no soportada' });

        const vehiculosConvertidos = vehiculos.map(v => {
            return {
                ...v,
                precio_convertido: (v.precio * rates[moneda]).toFixed(2),
                moneda: moneda,
                rates: rates[moneda]
            };
        });

        return res.status(200).json(vehiculosConvertidos);
    } catch (error) {
        res.status(500).json({ message: 'Error al convertir precios', error: error.message });
    }
});

routerLogin.post('/api/ventas', verifyToken, async (req, res) => {
  try{
    const { fecha, vehiculo_id, cliente_id, vendedor_id, precio_total, impuestos } = req.body;
    const newVenta = await Venta.create({
      fecha,
      vehiculo_id,
      cliente_id,
      vendedor_id,
      precio_total,
      impuestos
        
    });

if (newVenta) {
  const vehiculo = await Vehiculo.findByPk(vehiculo_id);

      if (!vehiculo) {
        return res.status(404).json({ message: 'Vehículo no encontrado' });
      }

      // Verificar que haya unidades disponibles
      if (vehiculo.disponible <= 0) {
        return res.status(400).json({ message: 'No hay unidades disponibles de este vehículo' });
      }

      // Reducir la cantidad en 1
      vehiculo.disponible -= 1;

      // Guardar cambios en BD
      await vehiculo.save();

   return res.status(201).json({
      message: 'Venta creada correctamente',
      data: newVenta 
    
     });
}
    
  } catch (error) {
    console.error('Error al crear Venta:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
    });
    

 routerLogin.get('/api/ventas', verifyToken, async (req, res) => {
    const ventas = await Venta.findAll();
    if (!ventas) {
    return res.status(500).json({status:500, message:'Error en la consulta...', data:null});

    }
    return res.status(200).json(ventas);
});



routerLogin.get('/api/clientes', verifyToken, async (req, res) => {
    const cliente = await Cliente.findAll();
    if (!cliente) {
    return res.status(500).json({status:500, message:'Error en la consulta', data:null});

    }
    return res.status(200).json({status: 200, message: 'Success', data:cliente });

});

routerLogin.delete('/api/vehiculos/eliminar/:id',verifyToken, async (req, res) => {
     
  
  try {
    const { id, vehiculo_id} = req.params;
    const encontrar =await Vehiculo.findByPk(id);
    if (!encontrar) {
    return res.status(403).json({status:403, message:'No se encontró id', data:null});
    }else{
      await Venta.destroy({ where: { vehiculo_id: id } });
  await encontrar.destroy({ where: { id } });
    
    return res.status(200).json({status:200, message: 'Repuesto eliminado' });
    }
  } catch (error) {
    console.log(error);
  }
    
});
routerLogin.put('/api/vehiculos/actualizar/:id', verifyToken, async (req, res) => {
   const { id } = req.params;
    const { marca,modelo,anio,precio, disponible } = req.body;
    const actualizar =await Vehiculo.findByPk(id);
    if (actualizar) {
      if (marca !== undefined) actualizar.marca = marca;
      if (modelo !== undefined) actualizar.modelo = modelo;
      if (anio !== undefined) actualizar.anio = anio;
      if (precio !== undefined) actualizar.precio = precio;
      if (disponible !== undefined) actualizar.disponible = disponible;
      
      await actualizar.save();
    }
    return res.status(200).json({status:200, message: 'Auto actualizado' });

});

routerLogin.post('/api/vehiculos', verifyToken, async (req, res) => {
      try{
    const {marca,modelo,anio,precio, disponible } = req.body;

  
    
    const newAuto = await Vehiculo.create({
      marca,
      modelo,
      anio,
      precio,
      disponible
      
      
    });


     return res.status(201).json({
      message: 'Usuario creado correctamente',
      data: newAuto 
    });
  
  } catch (error) {
    console.error('Error al crear Usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
    });


    routerLogin.get('/api/repuestos/agregar/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const encontrar =await Repuesto.findByPk(id);
    if (!encontrar) {
    return res.status(403).json({status:403, message:'No se encontró id', data:null});
    }else{
    
    return res.status(200).json({status:200, data:encontrar, message: 'Repuesto eliminado' });
    }
    
    
});

routerLogin.get('/api/repuestos/inventario/todos', verifyToken, async (req, res) => {
   
    const encontrar =await RegistroCompra.findAll();
    if (!encontrar) {
    return res.status(403).json({status:403, message:'No se encontró id', data:null});
    }else{
    
    return res.status(200).json({status:200, data:encontrar, message: 'Listo' });
    }
  });

routerLogin.post('/api/repuestos/inventario/agregar-compra', verifyToken, async (req, res) => {
try {
    const carrito = req.body; // debe ser un arreglo [{repuesto_id, cantidad_comprada}, ...]
    
    if (!Array.isArray(carrito)) {
      return res.status(400).json({ message: 'El carrito debe ser un arreglo' });
    }

    const registros = [];

    for (const item of carrito) {
      const {  id, repuesto_id } = item;

      const repuesto = await Repuesto.findByPk(id );
      if (!repuesto) {
        return res.status(404).json({ message: `Repuesto con id ${id} no encontrado` });
      }

      // Crear registro de compra
      const registro = await RegistroCompra.create({
        repuesto_id: repuesto.id,
        codigo_repuesto: repuesto.Codigo,
        nombre_repuesto: repuesto.Nombre,
        marca_repuesto: repuesto.Marca,
        precio_unitario: repuesto.Precio
      });

      // Actualizar inventario
      repuesto.Cantidad += repuesto.Cantidad
      await repuesto.save();

      registros.push(registro);
    }

    res.status(201).json({
      message: 'Compra registrada correctamente',
      data: registros
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar la compra' });
  }
});
/*
routerLogin.get('/api/convertir/:moneda', async (req, res) => {
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
                moneda: moneda,
                rates: rates[moneda]
            };
        });

        return res.status(200).json(vehiculosConvertidos);
    } catch (error) {
        res.status(500).json({ message: 'Error al convertir precios', error: error.message });
    }
});

routerLogin.post('/api/users', async (req, res) => {
    const { Nombre } = req.body;
    const Password = req.body.Password.substring(0,45);
    const hashedPassword = bcrypt.hashSync(Password, 8);

   const usuario= await db.execute('INSERT INTO users(Nombre, Password) VALUES (?, ?)', [Nombre, hashedPassword]);
    if (!usuario) {
      return res.status(500).json({status:500, message:'Error al insertar usuario...', data:null});

    }

    return res.json({ message: 'Usuario registrado correctamente'});
});



routerLogin.post('/api/vehiculos', verifyToken, async (req, res) => {
    const {marca, modelo, anio, precio, disponible } = req.body;
    const vehiculo= await db.execute('INSERT INTO vehiculos (marca, modelo, anio, precio, disponible) VALUES (?, ?, ?, ?, ?)', [marca, modelo, anio, precio, disponible]);
    if (!vehiculo) {
           return res.status(500).json({status:500, message:'Error en la consulta al ingresar...', data:null});

    }
    });

    routerLogin.get('/api/ventas', verifyToken, async (req, res) => {
    const [rows] = await db.execute('SELECT * FROM ventas');
    if (!rows) {
    return res.status(500).json({status:500, message:'Error en la consulta...', data:null});

    }
    return res.status(200).json(rows);
});

routerLogin.post('/api/ventas', verifyToken, async (req, res) => {
    const { fecha, vehiculo_id, cliente_id, vendedor_id, precio_total, impuestos } = req.body;
    const insertar = await db.execute('INSERT INTO ventas (fecha, vehiculo_id, cliente_id, vendedor_id, precio_total, impuestos) VALUES (?, ?, ?, ?, ?, ?)', [fecha, vehiculo_id, cliente_id, vendedor_id, precio_total, impuestos]);
    if (!insertar) {
    return res.status(500).json({status:500, message:'Error en la consulta al insertar', data:null});

    }
    return res.status(200).json({status:200, message: 'Venta registrada' });
});



routerLogin.get('/api/repuestos', verifyToken, async (req, res) => {
   try {
    
   
const queryParam = req.query.q;

  if (!queryParam) {
    return res.status(400).json({ error: 'Parámetro "q" es requerido' });
  }

  const query = queryParam.toLowerCase();
    const valores =[`%${query}%`];
   
      const sql = `SELECT * FROM repuestos WHERE Nombre LIKE ?`;

const [rows]= await db.execute(sql, valores);
     return res.status(200).json(rows);

  } catch (error) {
    console.error('Error en la consulta:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
   } 
});



routerLogin.post('/api/repuestos', async (req, res) => {
    const {Codigo, Nombre, Marca, Cantidad, Precio, Estante } = req.body;
    const vehiculo= await db.execute('INSERT INTO repuestos (Codigo, Nombre, Marca, Cantidad, Precio, Estante) VALUES (?, ?, ?, ?, ?, ?)', [Codigo,Nombre,Marca,Cantidad, Precio, Estante]);
    if (!vehiculo) {
           return res.status(500).json({status:500, message:'Error en la consulta al ingresar...', data:null});

    }
    return res.status(200).json({status:200, message: 'Repuesto Agregado',data:vehiculo });
    });


    routerLogin.put('/api/repuestos/actualizar/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { Codigo,Nombre,Marca,Cantidad, Precio, Estante } = req.body;
    const actualizar =await db.execute('UPDATE repuestos SET Codigo = ?, Nombre = ?, Marca = ?, Cantidad = ?, Precio = ?, Estante = ? WHERE id = ?', [Codigo, Nombre, Marca, Cantidad, Precio,Estante, id]);
    if (!actualizar) {
   return res.status(500).json({status:500, message:'Error en la consulta al actualizar...', data:null});

    }
    return res.status(200).json({status:200, message: 'Repuesto actualizado' });

    
});

routerLogin.get('/api/repuestos/todos', verifyToken, async (req, res) => {
    const [rows] = await db.execute('SELECT * FROM repuestos');
    if (!rows) {
    return res.status(500).json({status:500, message:'Error en la consulta', data:null});

    }
    return res.status(200).json({data:rows});

});
*/


export {routerLogin};



