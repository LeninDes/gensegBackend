-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_usuario_key`(`usuario`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rol` (
    `id_rol` INTEGER NOT NULL AUTO_INCREMENT,
    `n_rol` VARCHAR(191) NOT NULL,
    `abrev` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_rol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permiso` (
    `id_per` INTEGER NOT NULL AUTO_INCREMENT,
    `n_per` VARCHAR(191) NOT NULL,
    `abreviatura` VARCHAR(191) NULL,

    PRIMARY KEY (`id_per`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetallePermiso` (
    `id_dper` INTEGER NOT NULL AUTO_INCREMENT,
    `id_rol` INTEGER NOT NULL,
    `id_per` INTEGER NOT NULL,
    `estado` BOOLEAN NOT NULL,

    PRIMARY KEY (`id_dper`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `dni` CHAR(8) NOT NULL,
    `n_usu` VARCHAR(191) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `password` VARCHAR(191) NOT NULL,
    `rol_id` INTEGER NOT NULL,
    `subunidad_id_subuni` INTEGER NOT NULL,

    PRIMARY KEY (`dni`, `rol_id`, `subunidad_id_subuni`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sub_unidad` (
    `id_subuni` INTEGER NOT NULL AUTO_INCREMENT,
    `n_subuni` VARCHAR(191) NOT NULL,
    `abreviatura` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_subuni`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DetallePermiso` ADD CONSTRAINT `DetallePermiso_id_per_fkey` FOREIGN KEY (`id_per`) REFERENCES `Permiso`(`id_per`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetallePermiso` ADD CONSTRAINT `DetallePermiso_id_rol_fkey` FOREIGN KEY (`id_rol`) REFERENCES `Rol`(`id_rol`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_rol_id_fkey` FOREIGN KEY (`rol_id`) REFERENCES `Rol`(`id_rol`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_subunidad_id_subuni_fkey` FOREIGN KEY (`subunidad_id_subuni`) REFERENCES `Sub_unidad`(`id_subuni`) ON DELETE RESTRICT ON UPDATE CASCADE;
