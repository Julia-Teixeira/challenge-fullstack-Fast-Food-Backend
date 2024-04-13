/*
  Warnings:

  - Made the column `nameCostumer` on table `orders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "nameCostumer" SET NOT NULL;
