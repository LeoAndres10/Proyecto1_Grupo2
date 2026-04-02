const { DataTypes } = require('sequelize');
const {db} = require('../config/db');

const Repuesto = db.define('repuestos', {
   
    codigo: {
        type: DataTypes.STRING
    },

    nombre: {
        type: DataTypes.STRING
    },
    marca: {
        type:DataTypes.STRING
    },
    cantidad: {
        type:DataTypes.INTEGER
    },
    precio: {
        type: DataTypes.INTEGER
    },
    estante: {
        type:DataTypes.INTEGER
    }
   
   
    
},
    {
        tableName: 'repuestos',
        timestamps: false
    }
)

module.exports=Repuesto;