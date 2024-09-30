/*
  Warnings:

  - You are about to drop the `permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rolepermission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `rolepermission` DROP FOREIGN KEY `RolePermission_permissionId_fkey`;

-- DropForeignKey
ALTER TABLE `rolepermission` DROP FOREIGN KEY `RolePermission_roleId_fkey`;

-- DropTable
DROP TABLE `permission`;

-- DropTable
DROP TABLE `role`;

-- DropTable
DROP TABLE `rolepermission`;

-- CreateTable
CREATE TABLE `Roles` (
    `id_rol` INTEGER NOT NULL AUTO_INCREMENT,
    `n_rol` VARCHAR(191) NOT NULL,
    `abrev` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_rol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permisos` (
    `id_per` INTEGER NOT NULL AUTO_INCREMENT,
    `n_per` VARCHAR(191) NOT NULL,
    `abrev` VARCHAR(191) NULL,

    PRIMARY KEY (`id_per`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `De_permiso` (
    `id_Dper` INTEGER NOT NULL AUTO_INCREMENT,
    `id_rol` INTEGER NOT NULL,
    `id_per` INTEGER NOT NULL,
    `estado` BOOLEAN NOT NULL,

    PRIMARY KEY (`id_Dper`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `dni` CHAR(8) NOT NULL,
    `n_usu` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL,
    `rol_id` INTEGER NOT NULL,
    `id_sub` INTEGER NOT NULL,

    PRIMARY KEY (`dni`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sub_unidad` (
    `id_subUni` INTEGER NOT NULL AUTO_INCREMENT,
    `n_subUni` VARCHAR(191) NOT NULL,
    `abrev` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_subUni`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `De_permiso` ADD CONSTRAINT `De_permiso_id_per_fkey` FOREIGN KEY (`id_per`) REFERENCES `Permisos`(`id_per`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `De_permiso` ADD CONSTRAINT `De_permiso_id_rol_fkey` FOREIGN KEY (`id_rol`) REFERENCES `Roles`(`id_rol`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_rol_id_fkey` FOREIGN KEY (`rol_id`) REFERENCES `Roles`(`id_rol`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_id_sub_fkey` FOREIGN KEY (`id_sub`) REFERENCES `Sub_unidad`(`id_subUni`) ON DELETE RESTRICT ON UPDATE CASCADE;
