/*
  Warnings:

  - You are about to alter the column `resdate` on the `resdate` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `actividad` ADD COLUMN `idString` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `project` ADD COLUMN `idString` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `resdate` MODIFY `resdate` DATETIME(3) NOT NULL;
