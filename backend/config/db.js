const {Sequelize} =require('sequelize');

const db= new Sequelize(
    'postgres',
    'postgres.plsxghjqbxudedtxwwgn',
    'Detdodoelmundo13',
    {
        host:'aws-0-us-west-2.pooler.supabase.com',
        port:5432,
        dialect:'postgres',
        dialectOptions: {
    ssl: { require: true,
    rejectUnauthorized: false 
    }  // obligatorio para Supabase
  },
  pool: {
    max: 10,
    min: 0,
    idle: 10000,
    acquire: 30000
  },

        logging: false
    }
)

const autolote = new Sequelize(
    'postgres',
    'postgres.qwlduwfxolmihptdhysv',
    'Detdodoelmundo13',
    {
        host:'aws-0-us-west-2.pooler.supabase.com',
        port:5432,
        dialect:'postgres',
        dialectOptions: {
    ssl: { require: true,
    rejectUnauthorized: false 
 }  // obligatorio para Supabase
  },
  pool: {
    max: 10,
    min: 0,
    idle: 10000,
    acquire: 30000
  },

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
