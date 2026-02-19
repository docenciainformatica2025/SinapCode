import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Intentando conectar a la base de datos...')
    try {
        const projects = await prisma.cmsProject.findMany({ take: 1 })
        console.log('Conexión exitosa. Proyectos encontrados:', projects.length)
    } catch (error) {
        console.error('Error de conexión:', error)
    } finally {
        await prisma.$disconnect()
    }
}

main()
