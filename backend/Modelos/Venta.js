const { DataTypes } = require('sequelize');
const {autolote} = require('../config/db');

const Venta = autolote.define('ventas', {
   
    fecha: {
        type: DataTypes.DATE
    },

    vehiculo_id: {
        type: DataTypes.INTEGER
    },
    cliente_id: {
        type: DataTypes.INTEGER
    },

    vendedor_id: {
        type: DataTypes.INTEGER
    },
    precio_total:{
        type: DataTypes.DECIMAL
    },
    impuestos: {
        type: DataTypes.DECIMAL
    }
   
   
    
},
    {
        tableName: 'ventas',
        timestamps: false
    }
)
module.exports=Venta;
