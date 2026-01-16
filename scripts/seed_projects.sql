-- SQL Seed for Projects (Corrected)
-- Run this in your Supabase SQL Editor

INSERT INTO projects (id, title, student, role, description, image_url, tags, is_visible, order_index, created_at)
VALUES 
(
  '550e8400-e29b-41d4-a716-446655440001',
  'Bot de Trading con IA',
  'Carlos M.',
  'Backend Python',
  'Algoritmo que analiza sentimiento en Twitter para predecir movimientos de crypto. +45% de rentabilidad en simulación.',
  'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&q=80&w=800',
  ARRAY['Python', 'NLP', 'Binance API'],
  true,
  0,
  NOW()
),
(
  '550e8400-e29b-41d4-a716-446655440002',
  'DeFi Dashboard',
  'Ana R.',
  'Full Stack Web3',
  'Panel visual para gestionar staking en múltiples cadenas. Integra wallets reales y calcula APY en tiempo real.',
  'https://images.unsplash.com/photo-1639322537228-ad7117a3a635?auto=format&fit=crop&q=80&w=800',
  ARRAY['Next.js', 'Solidity', 'Ethers.js'],
  true,
  1,
  NOW()
),
(
  '550e8400-e29b-41d4-a716-446655440003',
  'SaaS de Ciberseguridad',
  'David L.',
  'SecDevOps',
  'Plataforma automatizada que escanea vulnerabilidades en repositorios de GitHub al hacer push. Uso real en 3 empresas.',
  'https://images.unsplash.com/photo-1563206767-5b1d972d9fb7?auto=format&fit=crop&q=80&w=800',
  ARRAY['Python', 'Docker', 'AWS'],
  true,
  2,
  NOW()
)
ON CONFLICT (id) DO NOTHING;
