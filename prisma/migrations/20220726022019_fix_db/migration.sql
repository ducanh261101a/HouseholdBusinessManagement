-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "user" (
    "userId" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "user_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "customer" (
    "customerId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("customerId")
);

-- CreateTable
CREATE TABLE "order" (
    "orderId" SERIAL NOT NULL,
    "rentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnDate" TIMESTAMP(3) NOT NULL,
    "status" INTEGER NOT NULL,
    "Note" TEXT NOT NULL,
    "customerId" INTEGER NOT NULL,
    "createdBy" INTEGER NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "orderDetail" (
    "orderId" INTEGER NOT NULL,
    "productCode" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "priceEach" TEXT NOT NULL,

    CONSTRAINT "orderDetail_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "product" (
    "productId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "productType" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "productLine" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "productLine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" SERIAL NOT NULL,
    "total" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,
    "debt" TEXT NOT NULL,
    "paid" TEXT NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "orderDetail_productCode_key" ON "orderDetail"("productCode");

-- CreateIndex
CREATE UNIQUE INDEX "productLine_id_key" ON "productLine"("id");

-- CreateIndex
CREATE UNIQUE INDEX "payment_orderId_key" ON "payment"("orderId");

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderDetail" ADD CONSTRAINT "orderDetail_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderDetail" ADD CONSTRAINT "orderDetail_productCode_fkey" FOREIGN KEY ("productCode") REFERENCES "product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_productType_fkey" FOREIGN KEY ("productType") REFERENCES "productLine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;
