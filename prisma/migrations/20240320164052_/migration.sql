-- CreateEnum
CREATE TYPE "AdditionalTypes" AS ENUM ('drink', 'souce', 'ingredient');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('onGoing', 'finished');

-- CreateEnum
CREATE TYPE "PaymentsTypes" AS ENUM ('debit', 'credit', 'inCash');

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "description" TEXT,
    "imgCover" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "imgCover" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "additional" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "imgCover" TEXT NOT NULL,
    "description" TEXT,
    "type" "AdditionalTypes" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "additional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productOrder" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 1,
    "note" TEXT NOT NULL,
    "total" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "productId" INTEGER NOT NULL,
    "orderId" INTEGER,

    CONSTRAINT "productOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "nameCostumer" VARCHAR(128),
    "status" "OrderStatus" NOT NULL,
    "code" INTEGER,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "change" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "total" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "type" "PaymentsTypes" NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AdditionalToProductOrder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AdditionalToProductOrder_AB_unique" ON "_AdditionalToProductOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_AdditionalToProductOrder_B_index" ON "_AdditionalToProductOrder"("B");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productOrder" ADD CONSTRAINT "productOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productOrder" ADD CONSTRAINT "productOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdditionalToProductOrder" ADD CONSTRAINT "_AdditionalToProductOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "additional"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdditionalToProductOrder" ADD CONSTRAINT "_AdditionalToProductOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "productOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
