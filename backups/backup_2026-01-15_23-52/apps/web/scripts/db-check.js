const { Client } = require('pg');

const config = {
    host: 'aws-1-us-east-2.pooler.supabase.com', // CORRECTED from screenshot
    port: 6543,
    database: 'postgres',
    user: 'postgres.zwmkrbeojsycdxcnqlmy',
    password: '8f6YQpW9LuTXM0B6', // NEW PASSWORD from user // Password detected from chat history
    ssl: { rejectUnauthorized: false }
};

async function testConnection(label, customConfig) {
    console.log(`\n🧪 Testing: ${label}`);
    console.log(`   Host: ${customConfig.host}:${customConfig.port}`);
    console.log(`   User: ${customConfig.user}`);

    const client = new Client(customConfig);

    try {
        await client.connect();
        console.log("   ✅ SUCCESS: Connected and Authenticated!");
        const res = await client.query('SELECT NOW()');
        console.log("   🕰️  Server Time: ", res.rows[0].now);
        await client.end();
        return true;
    } catch (err) {
        console.log("   ❌ FAILED:");
        console.log("   Code: ", err.code);
        console.log("   Message: ", err.message);
        console.log("   Full Error: ", JSON.stringify(err, null, 2));
        if (err.message.includes("password")) {
            console.log("   💡 HINT: Incorrect password OR password needs encoding.");
        } else if (err.message.includes("found")) {
            console.log("   💡 HINT: Tenant/User not found. Check Project Ref ID.");
        } else if (err.code === 'ENOTFOUND') {
            console.log("   💡 HINT: DNS Error. Hostname incorrect.");
        }
        try { await client.end(); } catch (e) { }
        return false;
    }
}

async function runDiagnostics() {
    console.log("🔍 STARTING ADVANCED SUPABASE DIAGNOSTIC 🔍");

    // Test 1: Standard Connection Pooler (6543)
    let success = await testConnection("Pooler (IPv4) - Standard User", config);

    // Test 2: Pooler with simple username
    if (!success) {
        await testConnection("Pooler (IPv4) - Simple 'postgres' User", {
            ...config,
            user: 'postgres'
        });
    }

    // Test 3: Session Mode (5432) - often fails on IPv4 if no addon
    if (!success) {
        await testConnection("Direct Session (5432) - IPv6/Addon check", {
            ...config,
            port: 5432
        });
    }
}

runDiagnostics();
