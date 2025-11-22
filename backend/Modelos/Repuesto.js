const { DataTypes } = require('sequelize');
const {db} = require('../config/db');

const Repuesto = db.define('repuestos', {
   
    Codigo: {
        type: DataTypes.STRING
    },

    Nombre: {
        type: DataTypes.STRING
    },
    Marca: {
        type:DataTypes.STRING
    },
    Cantidad: {
        type:DataTypes.INTEGER
    },
    Precio: {
        type: DataTypes.INTEGER
    },
    Estante: {
        type:DataTypes.INTEGER
    }
   
   
    
},
    {
        tableName: 'repuestos',
        timestamps: false
    }
)

module.exports=Repuesto;