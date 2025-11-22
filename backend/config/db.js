const {Sequelize} =require('sequelize');

const db= new Sequelize(
    'megarepuestos',
    'root',
    'Rockstar1318',
    {
        host:'localhost',
        port:3306,
        dialect:'mysql'
    }
)

const autolote = new Sequelize(
    'autolote',
    'root',
    'Rockstar1318',
    {
        host:'localhost',
        port:3306,
        dialect:'mysql'
    }
)

async function testConnections() {
    try {
        await db.authenticate();
        console.log('Conectado a megarepuestos (MySQL)');
        
        await autolote.authenticate();
        console.log('Conectado a autolote (SQL Server)');
    } catch (error) {
        console.error('Error de conexión:', error);
    }
}

// Ejecutar conexión
testConnections();

// Exportar ambas conexiones como propiedades de un objeto
module.exports = {
    db,
    autolote
};
