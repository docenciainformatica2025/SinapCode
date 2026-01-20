-- CreateTable
CREATE TABLE "site_config" (
    "id" TEXT NOT NULL DEFAULT 'global',
    "siteName" TEXT NOT NULL DEFAULT 'SinapCode',
    "description" TEXT,
    "logoUrl" TEXT,
    "faviconUrl" TEXT,
    "primaryColor" TEXT DEFAULT '#0EA5E9',
    "secondaryColor" TEXT DEFAULT '#F59E0B',
    "supportEmail" TEXT,
    "socialLinks" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "navigation_menus" (
    "id" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "items" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "navigation_menus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pricing_plans" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "interval" TEXT NOT NULL DEFAULT 'MONTHLY',
    "features" JSONB NOT NULL,
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pricing_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cms_testimonials" (
    "id" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorRole" TEXT,
    "authorImage" TEXT,
    "content" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "company" TEXT,
    "companyLogo" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cms_testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "navigation_menus_location_key" ON "navigation_menus"("location");

-- CreateIndex
CREATE INDEX "pricing_plans_isActive_idx" ON "pricing_plans"("isActive");

-- CreateIndex
CREATE INDEX "cms_testimonials_status_idx" ON "cms_testimonials"("status");

-- CreateIndex
CREATE INDEX "cms_testimonials_featured_idx" ON "cms_testimonials"("featured");
