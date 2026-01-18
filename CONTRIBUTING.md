# Contributing to SinapCode

> ⚠️ **CRITICAL WARNING:** This project adheres to **Military-Grade Engineering Standards** (ISO 25010, Zero Trust, WCAG AAA). Please read `docs/ENGINEERING_PROTOCOLS.md` BEFORE writing a single line of code.

## The Standard
All contributions must meet the **Safe-Guard Protocol V2.0**. We do not accept "quick fixes" or "cleanups" that violate architectural integrity.

### 1. Code Quality
- **Clean Architecture:** Domain logic must be decoupled from UI/Frameworks.
- **Testing:** New features require >95% unit test coverage.
- **Types:** Strict TypeScript. No `any`.

### 2. Flow
1.  **Read Context:** Understand the existing architecture (`docs/LEGAL_ENGINEERING_STANDARDS.md`, `task.md`).
2.  **Atomic Commits:** Use Conventional Commits (e.g., `feat(auth): implement mfa`).
3.  **Verify:** Run `npm run build` and `npm run test` locally.

### 3. Security
- **Zero Trust:** Validate all inputs.
- **Secrets:** Never commit `.env` files.

---
By contributing, you agree to uphold the highest standards of software excellence.
