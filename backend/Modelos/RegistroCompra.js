const { DataTypes } = require('sequelize');
const { db } = require('../config/db');
const Repuesto = require('./Repuesto');

const RegistroCompra = db.define('registro_compras', {
 
  repuesto_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  codigo_repuesto: {
    type: DataTypes.STRING,
  
  },
  nombre_repuesto: {
    type: DataTypes.STRING,
   
  },
  marca_repuesto: {
    type: DataTypes.STRING,
 
  },
  
  precio_unitario: {
    type: DataTypes.INTEGER,
   
  },
  fecha_compra: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'registro_compras',
  timestamps: false
});

// 🔗 Relación con repuesto
RegistroCompra.belongsTo(Repuesto, {
  foreignKey: 'repuesto_id',
  as: 'repuesto'
});

// (Opcional, para poder ver todos los registros desde un repuesto)
Repuesto.hasMany(RegistroCompra, {
  foreignKey: 'repuesto_id'
});

module.exports = RegistroCompra;