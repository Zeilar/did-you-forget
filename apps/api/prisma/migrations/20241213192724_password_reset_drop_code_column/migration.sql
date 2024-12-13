/*
  Warnings:

  - You are about to drop the column `code` on the `PendingPasswordReset` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PendingPasswordReset" DROP COLUMN "code";
