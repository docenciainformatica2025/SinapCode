const { Client } = require('pg');

async function checkUser() {
    const client = new Client({
        host: 'aws-1-us-east-2.pooler.supabase.com',
        port: 6543,
        database: 'postgres',
        user: 'postgres.zwmkrbeojsycdxcnqlmy',
        password: '8f6YQpW9LuTXM0B6',
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();
        const res = await client.query("SELECT id, email, role FROM users WHERE email = 'antonio_rburgos@msn.com'");
        console.log("USER_DATA:", JSON.stringify(res.rows[0]));
        await client.end();
    } catch (err) {
        console.error("ERROR:", err.message);
        process.exit(1);
    }
}

checkUser();
