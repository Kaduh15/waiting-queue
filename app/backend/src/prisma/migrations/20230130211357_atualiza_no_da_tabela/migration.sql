/*
  Warnings:

  - You are about to drop the `waiting_lines` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "waiting_lines";

-- CreateTable
CREATE TABLE "waiting_queue" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "Status" NOT NULL DEFAULT 'WAITING',
    "initial_service_time" TIMESTAMP(3),
    "finished_service_time" TIMESTAMP(3),

    CONSTRAINT "waiting_queue_pkey" PRIMARY KEY ("id")
);
