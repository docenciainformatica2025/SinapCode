-- ============================================
-- DASHBOARD ADMINISTRATIVO PRO - SCHEMA SQL
-- ============================================
-- Este script crea las tablas necesarias para el dashboard administrativo
-- Ejecutivo en Supabase SQL Editor




-- ============================================
-- 1. TABLA DE PROGRAMAS/CURSOS
-- ============================================

CREATE TABLE IF NOT EXISTS programs (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title TEXT NOT NULL,
    description TEXT,
    slug TEXT UNIQUE NOT NULL,
    thumbnail_url TEXT,
    level TEXT CHECK (level IN ('beginner', 'intermediate', 'advanced')),
    duration_hours INTEGER,
    price DECIMAL(10, 2) DEFAULT 0,
    discount_price DECIMAL(10, 2),
    is_published BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    category TEXT,
    tags TEXT[],
    instructor_id TEXT REFERENCES users(id) ON DELETE SET NULL,
    enrolled_count INTEGER DEFAULT 0,
    completion_rate DECIMAL(5, 2) DEFAULT 0,
    rating DECIMAL(3, 2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP(3),
    archived_at TIMESTAMP(3)
);

-- Índices para programs
CREATE INDEX IF NOT EXISTS idx_programs_slug ON programs(slug);
CREATE INDEX IF NOT EXISTS idx_programs_instructor ON programs(instructor_id);
CREATE INDEX IF NOT EXISTS idx_programs_published ON programs(is_published);
CREATE INDEX IF NOT EXISTS idx_programs_category ON programs(category);

-- ============================================
-- 2. TABLA DE MÓDULOS DE PROGRAMA
-- ============================================

CREATE TABLE IF NOT EXISTS program_modules (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    program_id TEXT NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    order_index INTEGER NOT NULL,
    duration_minutes INTEGER,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_modules_program ON program_modules(program_id);
CREATE INDEX IF NOT EXISTS idx_modules_order ON program_modules(program_id, order_index);

-- ============================================
-- 3. TABLA DE LECCIONES
-- ============================================

CREATE TABLE IF NOT EXISTS program_lessons (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    module_id TEXT NOT NULL REFERENCES program_modules(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    content TEXT,
    video_url TEXT,
    duration_minutes INTEGER,
    order_index INTEGER NOT NULL,
    is_free BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT false,
    resources JSONB,
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_lessons_module ON program_lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_lessons_order ON program_lessons(module_id, order_index);

-- ============================================
-- 4. TABLA DE INSCRIPCIONES
-- ============================================

CREATE TABLE IF NOT EXISTS program_enrollments (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    program_id TEXT NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('active', 'completed', 'cancelled')) DEFAULT 'active',
    progress DECIMAL(5, 2) DEFAULT 0,
    started_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP(3),
    last_accessed_at TIMESTAMP(3),
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, program_id)
);

CREATE INDEX IF NOT EXISTS idx_enrollments_user ON program_enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_program ON program_enrollments(program_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_status ON program_enrollments(status);

-- ============================================
-- 5. TABLA DE BANNERS
-- ============================================

CREATE TABLE IF NOT EXISTS banners (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    link_url TEXT,
    cta_text TEXT,
    position TEXT CHECK (position IN ('hero', 'sidebar', 'modal', 'notification')) DEFAULT 'hero',
    priority INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT false,
    target_audience JSONB, -- {roles: [], segments: []}
    start_date TIMESTAMP(3),
    end_date TIMESTAMP(3),
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    created_by TEXT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_banners_active ON banners(is_active);
CREATE INDEX IF NOT EXISTS idx_banners_position ON banners(position);
CREATE INDEX IF NOT EXISTS idx_banners_dates ON banners(start_date, end_date);

-- ============================================
-- 6. TABLA DE ANALYTICS EVENTS
-- ============================================

CREATE TABLE IF NOT EXISTS analytics_events (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
    event_type TEXT NOT NULL,
    event_name TEXT NOT NULL,
    properties JSONB,
    page_url TEXT,
    referrer TEXT,
    user_agent TEXT,
    ip_address TEXT,
    session_id TEXT,
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_analytics_user ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created ON analytics_events(created_at);

-- ============================================
-- 7. TABLA DE CONFIGURACIÓN DEL SISTEMA
-- ============================================

CREATE TABLE IF NOT EXISTS system_settings (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    category TEXT,
    description TEXT,
    is_public BOOLEAN DEFAULT false,
    updated_by TEXT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_settings_key ON system_settings(key);
CREATE INDEX IF NOT EXISTS idx_settings_category ON system_settings(category);

-- ============================================
-- 8. TABLA DE NOTIFICACIONES
-- ============================================

CREATE TABLE IF NOT EXISTS notifications (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    link_url TEXT,
    is_read BOOLEAN DEFAULT false,
    priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
    metadata JSONB,
    created_at TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP(3)
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created ON notifications(created_at);

-- ============================================
-- 9. VISTAS PARA ANALYTICS
-- ============================================

-- Vista de estadísticas de programas
CREATE OR REPLACE VIEW program_stats AS
SELECT 
    p.id,
    p.title,
    p.enrolled_count,
    p.completion_rate,
    p.rating,
    COUNT(DISTINCT pe.user_id) as active_students,
    AVG(pe.progress) as avg_progress,
    COUNT(DISTINCT CASE WHEN pe.status = 'completed' THEN pe.user_id END) as completed_students
FROM programs p
LEFT JOIN program_enrollments pe ON p.id = pe.program_id
GROUP BY p.id, p.title, p.enrolled_count, p.completion_rate, p.rating;

-- Vista de métricas diarias
CREATE OR REPLACE VIEW daily_metrics AS
SELECT 
    DATE(created_at) as date,
    COUNT(*) FILTER (WHERE event_type = 'page_view') as page_views,
    COUNT(DISTINCT user_id) FILTER (WHERE event_type = 'page_view') as unique_visitors,
    COUNT(*) FILTER (WHERE event_type = 'signup') as signups,
    COUNT(*) FILTER (WHERE event_type = 'enrollment') as enrollments
FROM analytics_events
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- ============================================
-- 10. FUNCIONES ÚTILES
-- ============================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON programs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_modules_updated_at BEFORE UPDATE ON program_modules
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON program_lessons
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_banners_updated_at BEFORE UPDATE ON banners
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON system_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 11. DATOS DE EJEMPLO (OPCIONAL)
-- ============================================

-- Insertar configuraciones iniciales del sistema
INSERT INTO system_settings (key, value, category, description, is_public) VALUES
('site_name', '"SinapCode"', 'general', 'Nombre del sitio', true),
('site_description', '"Plataforma de aprendizaje de programación"', 'general', 'Descripción del sitio', true),
('maintenance_mode', 'false', 'general', 'Modo de mantenimiento', false),
('max_upload_size', '10485760', 'media', 'Tamaño máximo de archivo (bytes)', false),
('allowed_file_types', '["jpg", "jpeg", "png", "gif", "pdf", "mp4"]', 'media', 'Tipos de archivo permitidos', false)
ON CONFLICT (key) DO NOTHING;

-- Insertar programa de ejemplo
INSERT INTO programs (id, title, description, slug, level, duration_hours, price, is_published, category) VALUES
('demo-program-1', 'Introducción a JavaScript', 'Aprende los fundamentos de JavaScript desde cero', 'intro-javascript', 'beginner', 40, 49.99, true, 'programming')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 12. PERMISOS (Row Level Security)
-- ============================================

-- Habilitar RLS en tablas sensibles
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Políticas para programs (todos pueden ver publicados, solo admins pueden editar)
CREATE POLICY "Programs are viewable by everyone if published" ON programs
    FOR SELECT USING (is_published = true OR auth.uid()::text IN (
        SELECT id::text FROM users WHERE role = 'ADMIN'
    ));

CREATE POLICY "Only admins can insert programs" ON programs
    FOR INSERT WITH CHECK (auth.uid()::text IN (
        SELECT id::text FROM users WHERE role = 'ADMIN'
    ));

CREATE POLICY "Only admins can update programs" ON programs
    FOR UPDATE USING (auth.uid()::text IN (
        SELECT id::text FROM users WHERE role = 'ADMIN'
    ));

-- Políticas para banners (solo admins)
CREATE POLICY "Only admins can manage banners" ON banners
    FOR ALL USING (auth.uid()::text IN (
        SELECT id::text FROM users WHERE role = 'ADMIN'
    ));

-- Políticas para system_settings (solo admins)
CREATE POLICY "Only admins can manage settings" ON system_settings
    FOR ALL USING (auth.uid()::text IN (
        SELECT id::text FROM users WHERE role = 'ADMIN'
    ));

-- Políticas para notifications (usuarios ven solo las suyas)
CREATE POLICY "Users can view their own notifications" ON notifications
    FOR SELECT USING (user_id = auth.uid()::text);

CREATE POLICY "Users can update their own notifications" ON notifications
    FOR UPDATE USING (user_id = auth.uid()::text);

-- ============================================
-- FIN DEL SCRIPT
-- ============================================

-- Verificar que todo se creó correctamente
SELECT 
    'programs' as table_name, COUNT(*) as count FROM programs
UNION ALL
SELECT 'program_modules', COUNT(*) FROM program_modules
UNION ALL
SELECT 'program_lessons', COUNT(*) FROM program_lessons
UNION ALL
SELECT 'program_enrollments', COUNT(*) FROM program_enrollments
UNION ALL
SELECT 'banners', COUNT(*) FROM banners
UNION ALL
SELECT 'analytics_events', COUNT(*) FROM analytics_events
UNION ALL
SELECT 'system_settings', COUNT(*) FROM system_settings
UNION ALL
SELECT 'notifications', COUNT(*) FROM notifications;
