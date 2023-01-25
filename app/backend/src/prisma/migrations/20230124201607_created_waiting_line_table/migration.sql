-- CreateTable
CREATE TABLE `waiting_lines` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` ENUM('WAITING', 'IN_PROGRESS', 'FINISHED', 'ABSENT') NOT NULL DEFAULT 'WAITING',
    `initial_service_time` DATETIME(3) NULL,
    `finished_service_time` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
