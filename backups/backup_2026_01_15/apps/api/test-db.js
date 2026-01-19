const { Client } = require('pg');

const connectionString = 'postgresql://postgres:v8p970WAWFmEM2GJ@db.zwmkrbeojsycdxcnqlmy.supabase.co:5432/postgres';

const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
});

console.log('Intentando conectar a:', connectionString.replace(/:[^:]*@/, ':****@'));

client.connect()
    .then(() => {
        console.log('✅ ¡Conexión exitosa!');
        return client.query('SELECT NOW()');
    })
    .then(res => {
        console.log('📅 Hora del servidor:', res.rows[0].now);
        client.end();
    })
    .catch(err => {
        console.error('❌ Error de conexión:', err.message);
        if (err.message.includes('Tenant or user not found')) {
            console.log('\nPosibles causas:');
            console.log('1. El Project ID (zwmkrbeojsycdxcnqlmy) es incorrecto');
            console.log('2. El proyecto está pausado en Supabase');
            console.log('3. La región de la base de datos no coincide');
        }
        client.end();
    });
