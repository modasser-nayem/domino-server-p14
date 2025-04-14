/*
  Warnings:

  - Added the required column `thumbnail` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_instructor_id_fkey";

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "thumbnail" TEXT NOT NULL,
ALTER COLUMN "instructor_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_instructor_id_fkey" FOREIGN KEY ("instructor_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
