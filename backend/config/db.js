const {Sequelize} =require('sequelize');

const db= new Sequelize(
    process.env.DATABASE_URL,
    {
        dialect:'postgres',
        dialectOptions: {
    ssl: { require: true,
    rejectUnauthorized: false 
    }  // obligatorio para Supabase
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
    acquire: 30000
  },

        logging: false
    }
)

const autolote = new Sequelize(process.env.DATABASE_URL,
    {
       
        dialect:'postgres',
        dialectOptions: {
    ssl: { require: true,
    rejectUnauthorized: false 
 }  // obligatorio para Supabase
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
    acquire: 30000
  },

        logging:false
    }
);

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
