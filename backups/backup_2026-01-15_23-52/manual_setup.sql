
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'TEACHER', 'ADMIN');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('TERMS', 'PRIVACY', 'COOKIES', 'COPPA');

-- CreateEnum
CREATE TYPE "ConsentMethod" AS ENUM ('CHECKBOX', 'BUTTON_CLICK', 'SCROLL_COMPLETE');

-- CreateEnum
CREATE TYPE "EventCategory" AS ENUM ('LEGAL', 'SECURITY', 'DATA', 'TRANSACTION');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('TERMS_UPDATE', 'PRIVACY_UPDATE', 'DATA_BREACH', 'ACCOUNT_DELETION');

-- CreateEnum
CREATE TYPE "DeliveryMethod" AS ENUM ('EMAIL', 'IN_APP', 'SMS');

-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('SENT', 'DELIVERED', 'READ', 'FAILED');

-- CreateEnum
CREATE TYPE "RequestType" AS ENUM ('ACCESS', 'RECTIFICATION', 'DELETION', 'PORTABILITY', 'OBJECTION');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'REJECTED');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',
    "birthDate" TIMESTAMP(3),
    "isMinor" BOOLEAN NOT NULL DEFAULT false,
    "guardianEmail" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLoginAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "legal_consents" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "documentType" "DocumentType" NOT NULL,
    "documentVersion" TEXT NOT NULL,
    "documentHash" TEXT NOT NULL,
    "consentMethod" "ConsentMethod" NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "geolocation" JSONB,
    "screenResolution" TEXT,
    "language" TEXT,
    "timezone" TEXT,
    "metadata" JSONB,
    "acceptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "legal_consents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "eventType" TEXT NOT NULL,
    "eventCategory" "EventCategory" NOT NULL,
    "eventData" JSONB NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "sessionId" TEXT,
    "hash" TEXT NOT NULL,
    "previousHash" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "legal_documents" (
    "id" TEXT NOT NULL,
    "documentType" "DocumentType" NOT NULL,
    "version" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "contentHash" TEXT NOT NULL,
    "effectiveDate" TIMESTAMP(3) NOT NULL,
    "deprecatedDate" TIMESTAMP(3),
    "changesSummary" TEXT,
    "metadata" JSONB,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "legal_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "legal_notifications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "notificationType" "NotificationType" NOT NULL,
    "documentVersion" TEXT,
    "deliveryMethod" "DeliveryMethod" NOT NULL,
    "deliveryStatus" "DeliveryStatus" NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readAt" TIMESTAMP(3),
    "emailId" TEXT,
    "trackingData" JSONB,
    "metadata" JSONB,

    CONSTRAINT "legal_notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_subject_requests" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "requestType" "RequestType" NOT NULL,
    "status" "RequestStatus" NOT NULL,
    "requestData" JSONB,
    "responseData" JSONB,
    "verificationMethod" TEXT,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "responseDeadline" TIMESTAMP(3) NOT NULL,
    "metadata" JSONB,

    CONSTRAINT "data_subject_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "legal_consents_userId_idx" ON "legal_consents"("userId");

-- CreateIndex
CREATE INDEX "legal_consents_documentType_idx" ON "legal_consents"("documentType");

-- CreateIndex
CREATE INDEX "legal_consents_acceptedAt_idx" ON "legal_consents"("acceptedAt");

-- CreateIndex
CREATE UNIQUE INDEX "legal_consents_userId_documentType_documentVersion_key" ON "legal_consents"("userId", "documentType", "documentVersion");

-- CreateIndex
CREATE INDEX "audit_logs_userId_idx" ON "audit_logs"("userId");

-- CreateIndex
CREATE INDEX "audit_logs_eventType_idx" ON "audit_logs"("eventType");

-- CreateIndex
CREATE INDEX "audit_logs_eventCategory_idx" ON "audit_logs"("eventCategory");

-- CreateIndex
CREATE INDEX "audit_logs_createdAt_idx" ON "audit_logs"("createdAt");

-- CreateIndex
CREATE INDEX "legal_documents_documentType_idx" ON "legal_documents"("documentType");

-- CreateIndex
CREATE INDEX "legal_documents_effectiveDate_idx" ON "legal_documents"("effectiveDate");

-- CreateIndex
CREATE UNIQUE INDEX "legal_documents_documentType_version_key" ON "legal_documents"("documentType", "version");

-- CreateIndex
CREATE INDEX "legal_notifications_userId_idx" ON "legal_notifications"("userId");

-- CreateIndex
CREATE INDEX "legal_notifications_notificationType_idx" ON "legal_notifications"("notificationType");

-- CreateIndex
CREATE INDEX "legal_notifications_sentAt_idx" ON "legal_notifications"("sentAt");

-- CreateIndex
CREATE INDEX "data_subject_requests_userId_idx" ON "data_subject_requests"("userId");

-- CreateIndex
CREATE INDEX "data_subject_requests_requestType_idx" ON "data_subject_requests"("requestType");

-- CreateIndex
CREATE INDEX "data_subject_requests_status_idx" ON "data_subject_requests"("status");

-- CreateIndex
CREATE INDEX "data_subject_requests_requestedAt_idx" ON "data_subject_requests"("requestedAt");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "legal_consents" ADD CONSTRAINT "legal_consents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_subject_requests" ADD CONSTRAINT "data_subject_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- 2. DATOS DE PRUEBA
-- Insertar usuario de prueba (Password: 123456)
INSERT INTO "users" ("id", "email", "name", "password", "role", "createdAt", "updatedAt")
VALUES (
  'user_demo_123',
  'maria@email.com',
  'Maria Estudiante',
  '$2b$10$Rv0E4.0gSdkLa8yTQRFocuDrPmCaqgkhVL1i9C90zpJA/3M9C66rK', -- Hash de '123456'
  'STUDENT',
  NOW(),
  NOW()
) ON CONFLICT ("email") DO NOTHING;
