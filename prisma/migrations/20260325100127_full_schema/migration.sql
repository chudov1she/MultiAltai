/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "deviceInfo" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "company_contacts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "phone" TEXT,
    "whatsapp" TEXT,
    "telegram" TEXT,
    "address" TEXT,
    "latitude" REAL,
    "longitude" REAL,
    "workTimeFrom" TEXT,
    "workTimeTo" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "locations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "address" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "land_categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "permitted_uses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "communications" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "features" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "land_plots" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "plotType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'AVAILABLE',
    "locationId" TEXT NOT NULL,
    "cadastralNumbers" JSONB NOT NULL DEFAULT [],
    "categoryId" TEXT NOT NULL,
    "permittedUseId" TEXT NOT NULL,
    "area" REAL NOT NULL,
    "price" REAL NOT NULL,
    "pricePerHundred" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdById" TEXT NOT NULL,
    CONSTRAINT "land_plots_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "land_plots_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "land_categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "land_plots_permittedUseId_fkey" FOREIGN KEY ("permittedUseId") REFERENCES "permitted_uses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "land_plots_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "media_files" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "landPlotId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "media_files_landPlotId_fkey" FOREIGN KEY ("landPlotId") REFERENCES "land_plots" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "document_files" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "landPlotId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "document_files_landPlotId_fkey" FOREIGN KEY ("landPlotId") REFERENCES "land_plots" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "applications" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "landPlotId" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "acceptedById" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "applications_landPlotId_fkey" FOREIGN KEY ("landPlotId") REFERENCES "land_plots" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "applications_acceptedById_fkey" FOREIGN KEY ("acceptedById") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CommunicationToLandPlot" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CommunicationToLandPlot_A_fkey" FOREIGN KEY ("A") REFERENCES "communications" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CommunicationToLandPlot_B_fkey" FOREIGN KEY ("B") REFERENCES "land_plots" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_FeatureToLandPlot" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_FeatureToLandPlot_A_fkey" FOREIGN KEY ("A") REFERENCES "features" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FeatureToLandPlot_B_fkey" FOREIGN KEY ("B") REFERENCES "land_plots" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "sessions_userId_idx" ON "sessions"("userId");

-- CreateIndex
CREATE INDEX "sessions_refreshToken_idx" ON "sessions"("refreshToken");

-- CreateIndex
CREATE UNIQUE INDEX "land_categories_name_key" ON "land_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "permitted_uses_name_key" ON "permitted_uses"("name");

-- CreateIndex
CREATE UNIQUE INDEX "communications_name_key" ON "communications"("name");

-- CreateIndex
CREATE UNIQUE INDEX "features_name_key" ON "features"("name");

-- CreateIndex
CREATE UNIQUE INDEX "land_plots_slug_key" ON "land_plots"("slug");

-- CreateIndex
CREATE INDEX "land_plots_slug_idx" ON "land_plots"("slug");

-- CreateIndex
CREATE INDEX "land_plots_status_idx" ON "land_plots"("status");

-- CreateIndex
CREATE INDEX "land_plots_isPublished_idx" ON "land_plots"("isPublished");

-- CreateIndex
CREATE INDEX "land_plots_plotType_idx" ON "land_plots"("plotType");

-- CreateIndex
CREATE INDEX "land_plots_price_idx" ON "land_plots"("price");

-- CreateIndex
CREATE INDEX "land_plots_area_idx" ON "land_plots"("area");

-- CreateIndex
CREATE INDEX "media_files_landPlotId_idx" ON "media_files"("landPlotId");

-- CreateIndex
CREATE INDEX "document_files_landPlotId_idx" ON "document_files"("landPlotId");

-- CreateIndex
CREATE INDEX "applications_type_idx" ON "applications"("type");

-- CreateIndex
CREATE INDEX "applications_isRead_idx" ON "applications"("isRead");

-- CreateIndex
CREATE INDEX "applications_landPlotId_idx" ON "applications"("landPlotId");

-- CreateIndex
CREATE INDEX "applications_createdAt_idx" ON "applications"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "_CommunicationToLandPlot_AB_unique" ON "_CommunicationToLandPlot"("A", "B");

-- CreateIndex
CREATE INDEX "_CommunicationToLandPlot_B_index" ON "_CommunicationToLandPlot"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FeatureToLandPlot_AB_unique" ON "_FeatureToLandPlot"("A", "B");

-- CreateIndex
CREATE INDEX "_FeatureToLandPlot_B_index" ON "_FeatureToLandPlot"("B");
