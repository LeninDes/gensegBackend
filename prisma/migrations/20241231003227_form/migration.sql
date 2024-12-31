/*
  Warnings:

  - Added the required column `idsubuni` to the `Form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idpe` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `form` ADD COLUMN `idsubuni` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `project` ADD COLUMN `idpe` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Facu` (
    `idfacu` INTEGER NOT NULL AUTO_INCREMENT,
    `nmFacu` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idfacu`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Escuela` (
    `idesc` INTEGER NOT NULL AUTO_INCREMENT,
    `nmEsc` VARCHAR(191) NOT NULL,
    `idfacu` INTEGER NOT NULL,

    PRIMARY KEY (`idesc`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrgEstudio` (
    `idpe` INTEGER NOT NULL AUTO_INCREMENT,
    `nmPE` VARCHAR(191) NOT NULL,
    `idesc` INTEGER NOT NULL,

    PRIMARY KEY (`idpe`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Form` ADD CONSTRAINT `Form_idsubuni_fkey` FOREIGN KEY (`idsubuni`) REFERENCES `Sub_unidad`(`id_subuni`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Escuela` ADD CONSTRAINT `Escuela_idfacu_fkey` FOREIGN KEY (`idfacu`) REFERENCES `Facu`(`idfacu`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrgEstudio` ADD CONSTRAINT `PrgEstudio_idesc_fkey` FOREIGN KEY (`idesc`) REFERENCES `Escuela`(`idesc`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_idpe_fkey` FOREIGN KEY (`idpe`) REFERENCES `PrgEstudio`(`idpe`) ON DELETE RESTRICT ON UPDATE CASCADE;
