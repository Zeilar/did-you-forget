/*
  Warnings:

  - A unique constraint covering the columns `[ipAddress]` on the table `Session` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Session_ipAddress_key" ON "Session"("ipAddress");
