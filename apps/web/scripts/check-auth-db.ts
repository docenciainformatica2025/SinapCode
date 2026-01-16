import fs from 'fs';
import path from 'path';

// Cargar variables de entorno manualmente para el script
const envPath = path.resolve(process.cwd(), '.env.local');
console.log(`Intentando cargar entorno desde: ${envPath}`);

if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf-8');
    envConfig.split(/\r?\n/).forEach(line => { // Handle CR LF properly
        if (!line.trim() || line.startsWith('#')) return; // Skip comments/empty

        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            const key = match[1].trim();
            const value = match[2].trim().replace(/^["']|["']$/g, '');
            if (!process.env[key]) {
                process.env[key] = value;
                // console.log(`Loaded ${key}`);
            }
        }
    });
    console.log("✅ Variables de entorno cargadas.");
} else {
    console.warn("⚠️ No se encontró .env.local");
}

import { PrismaClient } from "@prisma/client";

async function main() {
    console.log("Verificando conexión a base de datos...");

    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
        console.error("❌ DATABASE_URL no está definida en process.env");
        process.exit(1);
    }
    console.log(`URL de BD encontrada (longitud: ${dbUrl.length})`);

    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: dbUrl
            }
        }
    });

    try {
        await prisma.$connect();
        console.log("✅ Conexión exitosa.");

        const userCount = await prisma.user.count();
        console.log(`✅ Usuarios encontrados: ${userCount}`);

        if (userCount === 0) {
            console.log("⚠️ No hay usuarios. Se recomienda crear uno para pruebas.");
        }
    } catch (error) {
        console.error("❌ Error de conexión:", error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
