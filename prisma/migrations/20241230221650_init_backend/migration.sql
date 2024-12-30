/*
  Warnings:

  - A unique constraint covering the columns `[n_usu]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Usuario_n_usu_key` ON `Usuario`(`n_usu`);
