/*
  Warnings:

  - Added the required column `code` to the `PendingPasswordReset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PendingPasswordReset" ADD COLUMN     "code" TEXT NOT NULL;
