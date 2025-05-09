/*
  Warnings:

  - You are about to drop the column `total_duration` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `total_modules` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `total_duration` on the `lessons` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `modules` table. All the data in the column will be lost.
  - You are about to drop the `textContents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `videoContents` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `video_url` to the `modules` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "textContents" DROP CONSTRAINT "textContents_module_id_fkey";

-- DropForeignKey
ALTER TABLE "videoContents" DROP CONSTRAINT "videoContents_module_id_fkey";

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "total_duration",
DROP COLUMN "total_modules";

-- AlterTable
ALTER TABLE "lessons" DROP COLUMN "total_duration";

-- AlterTable
ALTER TABLE "modules" DROP COLUMN "type",
ADD COLUMN     "video_url" TEXT NOT NULL;

-- DropTable
DROP TABLE "textContents";

-- DropTable
DROP TABLE "videoContents";

-- DropEnum
DROP TYPE "AssignmentStatus";

-- DropEnum
DROP TYPE "ModuleType";
