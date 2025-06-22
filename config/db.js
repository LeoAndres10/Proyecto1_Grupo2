import mysql from 'mysql2/promise';

import dotenv from 'dotenv';
dotenv.config();
const db = await mysql.createPool({
host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME
});

db.getConnection((error,connection) => {
if(error){
    console.log('Error de conexion');
}else{
    console.log('Conexion exitosa..');
}
});


export {db};