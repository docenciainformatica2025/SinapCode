
const path = require('path');
const fs = require('fs');

const envLocalPath = path.resolve(process.cwd(), '.env.local');
console.log('Reading:', envLocalPath);

try {
    const content = fs.readFileSync(envLocalPath, 'utf8');
    const lines = content.split('\n');
    const dbUrl = lines.find(l => l.startsWith('DATABASE_URL='));
    if (dbUrl) {
        // Censurar password para seguridad en logs
        const censored = dbUrl.replace(/:([^:@]+)@/, ':****@');
        console.log('DATABASE_URL in file:', censored);
    } else {
        console.log('DATABASE_URL not found in .env.local');
    }
} catch (e) {
    console.error('Error reading file:', e.message);
}
