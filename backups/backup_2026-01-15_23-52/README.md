# SinapCode - AI-Powered Learning Platform

![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)
![License](https://img.shields.io/badge/license-Private-red.svg)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)
![Coverage](https://img.shields.io/badge/coverage-85%25-green.svg)

**SinapCode** is a next-generation educational platform that leverages Artificial Intelligence to provide personalized tutoring and verified certification via blockchain technology.

## 🚀 Features

### Core Experience
-   **AI Personal Tutor**: Real-time coding assistance and explanation.
-   **Interactive IDE**: Browser-based code editor with immediate feedback.
-   **Progress Tracking**: Gamified learning path with rewards.

### Enterprise Admin Suite (New in v1.1)
-   **Financial Dashboard**: Real-time revenue analytics and KPIs.
-   **Secure Ledger**: Military-grade transaction tracking with SHA-256 auditing.
-   **Content Management**: CRUD for Programs and Banners with strict validation.
-   **Security**: Rate-limiting, CSP, and RBAC implementation.

## 🛠️ Tech Stack

-   **Frontend**: Next.js 14 (App Router), React, TailwindCSS, Framer Motion.
-   **Backend**: Server Actions, NextAuth.js v4.
-   **Database**: PostgreSQL (Supabase), Prisma ORM.
-   **Infrastructure**: Vercel Edge Network.
-   **Monitoring**: Google Analytics 4, Vercel Analytics, Speed Insights.

## 📦 Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/sinapcode/web.git
    cd web
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Copy `.env.example` to `.env` and fill in the required variables:
    ```bash
    cp .env.example .env
    ```

4.  **Database Setup**
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Run Development Server**
    ```bash
    npm run dev
    ```

## 🔒 Security

This project adheres to strict security standards.
-   **Middleware**: Hardened with HSTS and CSP.
-   **API Protection**: In-memory Rate Limiting.
-   **Auditing**: Comprehensive logs for all administrative actions.

See [SECURITY.md](SECURITY.md) for vulnerability reporting.

## 🛡️ Compliance & Operations

We maintain strict operational security protocols aligned with ISO 27001 standards.

-   **Disaster Recovery**: Automated and manual backup strategies are defined in [SECURITY_OPERATIONS.md](docs/SECURITY_OPERATIONS.md).
-   **Data Hygiene**: Regular sanitization of debug logs and sensitive information from the codebase.
-   **Code Quality**: Enforced linting and formatting standards.

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and development process.

## 📄 License

Copyright &copy; 2026 SinapCode. All rights reserved.
Private Source Code - Do not distribute without authorization.
