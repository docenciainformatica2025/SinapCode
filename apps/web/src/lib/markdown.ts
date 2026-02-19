import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface LegalDocument {
    frontmatter: {
        title?: string;
        version?: string;
        id?: string;
        jurisdiction?: string;
        [key: string]: any;
    };
    content: string;
}

export function getLegalDocument(filename: string): LegalDocument {
    const cwd = process.cwd();
    // Check if we are already in apps/web or root
    const basePath = cwd.includes('apps\\web') || cwd.includes('apps/web')
        ? path.join(cwd, 'src/content/legal')
        : path.join(cwd, 'apps/web/src/content/legal');

    const filePath = path.join(basePath, filename);

    try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            frontmatter: data,
            content
        };
    } catch (error) {
        console.error(`Error al leer el archivo markdown en ${filePath}:`, error);
        return {
            frontmatter: { title: 'Error cargando el documento', version: '0.0.0' },
            content: '# Error\nNo se pudo cargar el documento. Por favor, contacta a soporte.'
        };
    }
}
