const { DataTypes } = require('sequelize');
const {autolote} = require('../config/db');

const Cliente = autolote.define('clientes', {
   
    nombre: {
        type: DataTypes.STRING
    },

    apellido: {
        type: DataTypes.STRING
    },
    correo: {
        type: DataTypes.STRING
    },

    telefono: {
        type: DataTypes.STRING
    },
    direccion:{
        type: DataTypes.STRING
    }
   
   
    
},
    {
        tableName: 'clientes',
        timestamps: false
    }
)
module.exports=Cliente;