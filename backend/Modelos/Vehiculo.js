const { DataTypes } = require('sequelize');
const {autolote} = require('../config/db');

const Vehiculo = autolote.define('vehiculos', {
   
    marca: {
        type: DataTypes.STRING
    },

    modelo: {
        type: DataTypes.STRING
    },
    anio: {
        type: DataTypes.INTEGER
    },

    precio: {
        type: DataTypes.DECIMAL
    },
    disponible:{
        type: DataTypes.TINYINT
    }
   
   
    
},
    {
        tableName: 'vehiculos',
        timestamps: false
    }
)
module.exports=Vehiculo;
