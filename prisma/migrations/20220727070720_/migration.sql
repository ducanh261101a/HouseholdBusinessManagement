/*
  Warnings:

  - A unique constraint covering the columns `[customerId]` on the table `customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderId]` on the table `order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderId]` on the table `orderDetail` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId]` on the table `product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "customer_customerId_key" ON "customer"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "order_orderId_key" ON "order"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "orderDetail_orderId_key" ON "orderDetail"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "payment_id_key" ON "payment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "product_productId_key" ON "product"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "user_userId_key" ON "user"("userId");
