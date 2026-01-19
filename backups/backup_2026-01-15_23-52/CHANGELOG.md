# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-01-15

### Added
- **Advanced Admin Suite**: Complete administrative dashboard for "SinapCode".
    - `Programs` Module: CRUD operations for educational programs.
    - `Banners` Module: Management of promotional banners.
    - `Financial` Module: Real-time revenue analytics and transaction ledger.
- **Security Hardening (Military-Grade)**:
    - Implemented strict Content Security Policy (CSP) in Middleware.
    - Added HTTP Strict Transport Security (HSTS) and X-Frame-Options.
    - Integrated In-Memory Rate Limiting (Token Bucket) for critical APIs (`auth`, `admin/write`).
- **Analytics & SEO**:
    - Integrated Google Analytics 4, Vercel Analytics, and Speed Insights.
    - Optimized SEO Metadata, Sitemap.xml, and Robots.txt.
    - Added JSON-LD Structured Data for `Organization` and `WebSite`.
- **Transactions**:
    - Secured PDF Receipt generation with Anti-fraud QR Code and SHA-256 Hash.
    - Active management actions: `Refund` and `Cancel` transaction.
    - CSV Export functionality for accounting audits.

### Changed
- **Architecture**: Migrated to a Domain-Driven Design structure for Admin components.
- **Database**: Updated Prisma Schema to include `Transaction`, `AuditLog`, and `Certificate` models.
- **Performance**: Optimized database queries with server-side pagination and filtering.

### Security
- Patched potential IDOR vulnerabilities in User Management.
- Removed all debug logging (`console.log`) from production builds.
- Enforced Role-Based Access Control (RBAC) on all `/api/admin` routes.

### Maintenance
- Performed comprehensive codebase cleanup: removed legacy comments and unused imports.
- Standardized debug logging removal across all `apps/web/src` components.
- Validated project structure against standard exclusions for backup efficiency.

## [1.0.0] - 2025-12-01

### Added
- Initial release of SinapCode Learning Platform.
- AI Tutor integration.
- User authentication via NextAuth.js.
