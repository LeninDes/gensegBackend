/*
  Warnings:

  - You are about to drop the column `escuelaProfesional` on the `actividad` table. All the data in the column will be lost.
  - Added the required column `escuelaProfesional` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `actividad` DROP COLUMN `escuelaProfesional`;

-- AlterTable
ALTER TABLE `project` ADD COLUMN `escuelaProfesional` VARCHAR(191) NOT NULL;
