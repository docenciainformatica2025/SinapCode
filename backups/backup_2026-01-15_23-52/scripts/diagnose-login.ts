
import fs from 'fs';
import path from 'path';
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// --- Utilería para cargar variables de entorno ---
const loadEnv = () => {
    const envPath = path.resolve(process.cwd(), '.env.local');
    console.log(`[Diagnostic] Intentando cargar entorno desde: ${envPath}`);

    if (fs.existsSync(envPath)) {
        const envConfig = fs.readFileSync(envPath, 'utf-8');
        envConfig.split(/\r?\n/).forEach(line => {
            if (!line.trim() || line.startsWith('#')) return;
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                const value = match[2].trim().replace(/^["']|["']$/g, '');
                if (!process.env[key]) {
                    process.env[key] = value;
                }
            }
        });
        console.log("[Diagnostic] ✅ Variables de entorno cargadas.");
    } else {
        console.warn("[Diagnostic] ⚠️ No se encontró .env.local");
    }
};

const main = async () => {
    console.log("\n--- INICIANDO DIAGNÓSTICO DE LOGIN ---");

    // 1. Cargar entorno
    loadEnv();

    // 2. Verificar variables críticas
    console.log("\n[1] Verificando Variables de Entorno:");

    const requiredVars = ['DATABASE_URL', 'NEXTAUTH_URL', 'NEXTAUTH_SECRET'];
    let missingVars = 0;

    requiredVars.forEach(varName => {
        const val = process.env[varName];
        if (val) {
            console.log(`   ✅ ${varName}: Presente (Longitud: ${val.length})`);
            if (varName === 'NEXTAUTH_URL') console.log(`      Valor: ${val}`);
        } else {
            console.error(`   ❌ ${varName}: FALTANTE`);
            missingVars++;
        }
    });

    if (!process.env.NEXTAUTH_SECRET && !process.env.AUTH_SECRET) {
        console.error("   ❌ NEXTAUTH_SECRET ni AUTH_SECRET están definidos.");
        missingVars++;
    }

    if (missingVars > 0) {
        console.error(`\n⚠️ Faltan ${missingVars} variables críticas. Esto puede causar fallos.`);
    }

    // 3. Probar conexión a Base de Datos
    console.log("\n[2] Verificando Base de Datos:");
    if (!process.env.DATABASE_URL) {
        console.error("   ❌ No se puede conectar sin DATABASE_URL. Abortando.");
        process.exit(1);
    }

    const prisma = new PrismaClient();

    try {
        await prisma.$connect();
        console.log("   ✅ Conexión a Prisma exitosa.");

        // 4. Verificar usuarios
        console.log("\n[3] Verificando Usuarios existente:");
        const count = await prisma.user.count();
        console.log(`   Total de usuarios en BD: ${count}`);

        if (count > 0) {
            const users = await prisma.user.findMany({
                take: 5,
                select: { email: true, role: true, name: true, password: true }
            });
            console.log("   Muestra de usuarios (primeros 5):");
            users.forEach(u => {
                const hasPassword = !!u.password && u.password.length > 0;
                console.log(`   - Email: ${u.email} | Rol: ${u.role} | ¿Tiene Password?: ${hasPassword ? 'SÍ' : 'NO'}`);
            });

            // Verificación específica para el placeholder si es relevante
            const demoEmail = 'maria@email.com';
            const demoUser = users.find(u => u.email === demoEmail);
            if (!demoUser) {
                const specificCheck = await prisma.user.findUnique({ where: { email: demoEmail } });
                if (specificCheck) {
                    console.log(`\n   ℹ️ Usuario demo '${demoEmail}' EXISTE.`);
                } else {
                    console.log(`\n   ℹ️ Usuario demo '${demoEmail}' NO existe en la BD.`);
                }
            }

        } else {
            console.warn("   ⚠️ La base de datos está vacía de usuarios.");
        }

    } catch (e) {
        console.error("   ❌ Error conectando a la base de datos:", e);
    } finally {
        await prisma.$disconnect();
    }

    console.log("\n--- FIN DIAGNÓSTICO ---");
};

main();
