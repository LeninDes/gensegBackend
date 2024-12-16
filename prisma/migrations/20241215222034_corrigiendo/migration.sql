/*
  Warnings:

  - You are about to drop the column `dni` on the `res` table. All the data in the column will be lost.
  - Added the required column `escuelaProfesional` to the `Actividad` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Prg_nmPrg_key` ON `prg`;

-- AlterTable
ALTER TABLE `actividad` ADD COLUMN `escuelaProfesional` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `res` DROP COLUMN `dni`;
