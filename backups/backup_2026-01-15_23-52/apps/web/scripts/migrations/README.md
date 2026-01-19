# Database Migrations

This directory contains manual SQL migrations for the database.

## How to Apply Migrations

### Option 1: Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the content of the migration file
4. Paste and run the SQL

### Option 2: Prisma Migrate (Production)

```bash
# Set DATABASE_URL environment variable
$env:DATABASE_URL = "your-database-url"

# Run migrations
npx prisma migrate deploy
```

### Option 3: psql Command Line

```bash
psql $DATABASE_URL -f scripts/migrations/001_add_cookie_consents.sql
```

## Migration History

| Migration | Date | Description | Status |
|-----------|------|-------------|--------|
| `001_add_cookie_consents.sql` | 2026-01-12 | Add cookie_consents table for GDPR | ⏳ Pending |

## Rollback

To rollback a migration, create a corresponding rollback file:

```sql
-- Rollback: 001_add_cookie_consents.sql
DROP TABLE IF EXISTS "cookie_consents";
```

## Best Practices

1. **Always backup** before running migrations
2. **Test in staging** first
3. **Run during low traffic** periods
4. **Monitor** after deployment
5. **Keep migrations** in version control
