
import fs from 'fs';
import path from 'path';
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// --- Utilería para cargar variables de entorno ---
const loadEnv = () => {
    const envPath = path.resolve(process.cwd(), '.env.local');
    console.log(`[Setup] Intentando cargar entorno desde: ${envPath}`);

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
        console.log("[Setup] ✅ Variables de entorno cargadas.");
    } else {
        console.warn("[Setup] ⚠️ No se encontró .env.local");
    }
};

const main = async () => {
    console.log("\n--- INICIANDO CONFIGURACIÓN DE BD (MODO SQL) ---");

    // 1. Cargar entorno
    loadEnv();

    if (!process.env.DATABASE_URL) {
        console.error("❌ DATABASE_URL no encontrada en entorno. Abortando.");
        process.exit(1);
    }

    // 2. Ejecutar Migración Manual (SQL)
    console.log("\n[1] Ejecutando Migración Manual SQL...");

    const migrationPath = path.resolve(process.cwd(), 'migration.sql');
    if (!fs.existsSync(migrationPath)) {
        console.error("❌ No se encontró migration.sql");
        process.exit(1);
    }

    const sqlContent = fs.readFileSync(migrationPath, 'utf-8');

    // Limpiar comentarios y dividir por sentencias
    // Nota: Sentencias complejas pueden requerir mejor parsing, pero para DDL generado por Prisma
    // split por ';' suele ser suficiente si no hay stored procedures.
    const statements = sqlContent
        .replace(/--.*$/gm, '') // Remover comentarios de línea
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0);

    const prisma = new PrismaClient();

    try {
        await prisma.$connect();
        console.log("   ✅ Conexión a Prisma exitosa.");

        console.log(`   Ejecutando ${statements.length} sentencias SQL...`);
        let successCount = 0;
        let errorCount = 0;

        for (const sql of statements) {
            try {
                await prisma.$executeRawUnsafe(sql);
                successCount++;
            } catch (e: any) {
                // Ignorar errores de "ya existe" (P2010 o mensaje específico de PG)
                if (e.message.includes('already exists') || e.code === 'P2010' || e.message.includes('P2010')) {
                    console.warn(`   ⚠️ Advertencia (ya existe): ${sql.substring(0, 30)}...`);
                } else {
                    console.error(`ERROR en SQL: ${sql.substring(0, 50)}...`, e.message);
                    errorCount++;
                    // No abortamos, intentamos lo demás (ej. tablas faltantes pueden crearse aunque otras existan)
                }
            }
        }
        console.log(`\n   ✅ Migración SQL finalizada. Éxitos: ${successCount}, Errores: ${errorCount}`);

    } catch (e) {
        console.error("❌ Falló la conexión inicial.", e);
        await prisma.$disconnect();
        process.exit(1);
    }

    // 3. Crear Usuario de Prueba
    console.log("\n[2] Verificando/Creando Usuario de Prueba...");

    try {
        const email = 'maria@email.com';
        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (!existingUser) {
            console.log(`   Creando usuario ${email}...`);
            const hashedPassword = await bcrypt.hash('123456', 10);

            await prisma.user.create({
                data: {
                    email,
                    name: 'Maria Estudiante',
                    password: hashedPassword,
                    role: 'STUDENT',
                }
            });
            console.log("   ✅ Usuario creado exitosamente.");
            console.log("      Email: maria@email.com");
            console.log("      Pass:  123456");
        } else {
            console.log(`   ℹ️ El usuario ${email} ya existe.`);
        }

    } catch (e) {
        console.error("❌ Error manipulando usuarios:", e);
    } finally {
        await prisma.$disconnect();
    }

    console.log("\n--- FIN CONFIGURACIÓN ---");
};

main();
