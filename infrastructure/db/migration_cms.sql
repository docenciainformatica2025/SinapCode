-- Create PageSection table
CREATE TABLE IF NOT EXISTS page_sections (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    page TEXT NOT NULL,
    key TEXT NOT NULL,
    title TEXT,
    content JSONB,
    is_visible BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    updated_by TEXT,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT page_sections_page_key_key UNIQUE (page, key)
);

CREATE INDEX IF NOT EXISTS page_sections_page_idx ON page_sections(page);

-- Create BlogPost table
CREATE TABLE IF NOT EXISTS blog_posts (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    cover_image TEXT,
    author_id TEXT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP(3),
    tags TEXT[],
    seo_title TEXT,
    seo_desc TEXT,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS blog_posts_is_published_idx ON blog_posts(is_published);
CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts(slug);

-- Create Testimonial table
CREATE TABLE IF NOT EXISTS testimonials (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT,
    content TEXT NOT NULL,
    avatar_url TEXT,
    rating INTEGER DEFAULT 5,
    is_visible BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create Project table
CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    student TEXT NOT NULL,
    role TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    tags TEXT[],
    repo_url TEXT,
    demo_url TEXT,
    is_visible BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Seed Initial Testimonials (Reference)
INSERT INTO testimonials (id, name, role, content, avatar_url, rating, is_visible, order_index)
VALUES 
(gen_random_uuid(), 'Carlos Mendoza', 'Desarrollador Full Stack', 'Increíble plataforma. Pasé de cero a desplegar mi primera app en 3 meses.', 'https://randomuser.me/api/portraits/men/32.jpg', 5, true, 0),
(gen_random_uuid(), 'Ana Ruiz', 'Data Scientist', 'Los tutores de IA son otro nivel. Explican mejor que muchos profesores.', 'https://randomuser.me/api/portraits/women/44.jpg', 5, true, 1),
(gen_random_uuid(), 'Miguel Ángel', 'CTO Startup', 'Contratamos a 3 egresados de SinapCode. El nivel técnico es superior.', 'https://randomuser.me/api/portraits/men/86.jpg', 5, true, 2);

-- Seed Initial Projects (Reference)
INSERT INTO projects (id, title, student, role, description, image_url, tags, repo_url, is_visible)
VALUES
(gen_random_uuid(), 'Bot de Trading AI', 'Carlos M.', 'Backend Python', 'Algoritmo de predicción de crypto basado en sentimiento de Twitter.', 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&q=80', ARRAY['Python', 'NLP'], 'https://github.com', true),
(gen_random_uuid(), 'DeFi Dashboard', 'Ana R.', 'Web3 Dev', 'Panel para staking y yield farming en Ethereum.', 'https://images.unsplash.com/photo-1639322537228-ad7117a3a635?auto=format&fit=crop&q=80', ARRAY['Solidity', 'React'], 'https://github.com', true);

-- Seed Page Sections (Home)
INSERT INTO page_sections (page, key, title, content)
VALUES
('home', 'hero', 'Aprende tecnología con IA real', '{"subtitle": "Formación diseñada para el mundo profesional.", "cta_text": "Comenzar Ahora", "cta_link": "/auth/register"}');
