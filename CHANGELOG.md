# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-01-16

### Added
- **UI/UX Revolution (Premium Design)**:
    - New "SinapCode Design System" with Dark Tech Palette (#0B0F14).
    - Typography overhaul: `Inter` for UI, `JetBrains Mono` for code.
    - Glassmorphism & Gold/Neon accents for high-end perception.
- **Mobile-First Experience**:
    - **Swipeable Course Carousel**: Native-like horizontal scroll snap for courses on mobile.
    - **Compact Hero**: Optimized viewport usage for small screens.
    - **Smart Navbar**: ScrollSpy active state, blur effects, and responsive mobile menu.
- **Content & Blog**:
    - **MDX Blog Engine**: High-performance blog with Markdown support.
    - **Projects Section**: Portfolio showcase with real-world case studies.
- **Admin Dashboard Pro (CPanel)**:
    - New `/admin` route with Server-Side Protection (Zero Flicker).
    - **System Monitor**: Real-time server status page.
    - **Finance Command Center**: Revenue tracking and visualization.

### Fixed
- **Accessibility**: 
    - `CourseCard` CTAs now visible on keyboard focus (WCAG Compliant).
    - Global Focus Ring standardization.
- **Performance**:
    - `next/font` integration for zero CLS (Cumulative Layout Shift).
    - optimized image loading strategies ("eager" for Hero).

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
