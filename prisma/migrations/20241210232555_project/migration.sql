/*
  Warnings:

  - A unique constraint covering the columns `[nmForm]` on the table `Form` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[n_per]` on the table `Permiso` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nmPrg]` on the table `Prg` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[n_rol]` on the table `Rol` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[n_subuni]` on the table `Sub_unidad` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `Prg` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `prg` ADD COLUMN `type` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Project` (
    `idproj` INTEGER NOT NULL AUTO_INCREMENT,
    `plan` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `dni` VARCHAR(191) NOT NULL,
    `id_rol` INTEGER NOT NULL,
    `subunidad_id_subuni` INTEGER NOT NULL,

    PRIMARY KEY (`idproj`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Actividad` (
    `idActivi` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `fInit` DATETIME(3) NOT NULL,
    `fFin` DATETIME(3) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `idproj` INTEGER NOT NULL,
    `idres` INTEGER NOT NULL,

    UNIQUE INDEX `Actividad_name_key`(`name`),
    PRIMARY KEY (`idActivi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Form_nmForm_key` ON `Form`(`nmForm`);

-- CreateIndex
CREATE UNIQUE INDEX `Permiso_n_per_key` ON `Permiso`(`n_per`);

-- CreateIndex
CREATE UNIQUE INDEX `Prg_nmPrg_key` ON `Prg`(`nmPrg`);

-- CreateIndex
CREATE UNIQUE INDEX `Rol_n_rol_key` ON `Rol`(`n_rol`);

-- CreateIndex
CREATE UNIQUE INDEX `Sub_unidad_n_subuni_key` ON `Sub_unidad`(`n_subuni`);

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_dni_id_rol_subunidad_id_subuni_fkey` FOREIGN KEY (`dni`, `id_rol`, `subunidad_id_subuni`) REFERENCES `Usuario`(`dni`, `rol_id`, `subunidad_id_subuni`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Actividad` ADD CONSTRAINT `Actividad_idproj_fkey` FOREIGN KEY (`idproj`) REFERENCES `Project`(`idproj`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Actividad` ADD CONSTRAINT `Actividad_idres_fkey` FOREIGN KEY (`idres`) REFERENCES `Res`(`idres`) ON DELETE RESTRICT ON UPDATE CASCADE;
