const { DataTypes } = require('sequelize');
const {db} = require('../config/db');

const Usuario = db.define('users', {
   
    Nombre: {
        type: DataTypes.STRING
    },

    Password: {
        type: DataTypes.STRING
    },
   
   
    
},
    {
        tableName: 'users',
        timestamps: false
    }
)

module.exports=Usuario;