const {Sequelize} =require('sequelize');

const db= new Sequelize(
    'postgres',
    'postgres',
    'Detodoelmundo13',
    {
        host:'db.plsxghjqbxudedtxwwgn.supabase.co',
        port:5432,
        dialect:'postgres',
        logging: false
    }
)

const autolote = new Sequelize(
    'postgres',
    'postgres',
    'Detodoelmundo13',
    {
        host:'db.qwlduwfxolmihptdhysv.supabase.co',
        port:5432,
        dialect:'postgres',
        logging:false
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
