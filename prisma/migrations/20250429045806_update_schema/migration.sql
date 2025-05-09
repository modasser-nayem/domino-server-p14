/*
  Warnings:

  - You are about to drop the `assignmentSubmissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `assignments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `quizAnswerSubmissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `quizAttempt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `quizQuestionOptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `quizQuestions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `quizzes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `course_id` to the `modules` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "assignmentSubmissions" DROP CONSTRAINT "assignmentSubmissions_assignment_id_fkey";

-- DropForeignKey
ALTER TABLE "assignmentSubmissions" DROP CONSTRAINT "assignmentSubmissions_student_id_fkey";

-- DropForeignKey
ALTER TABLE "assignments" DROP CONSTRAINT "assignments_module_id_fkey";

-- DropForeignKey
ALTER TABLE "quizAnswerSubmissions" DROP CONSTRAINT "quizAnswerSubmissions_attempt_id_fkey";

-- DropForeignKey
ALTER TABLE "quizAttempt" DROP CONSTRAINT "quizAttempt_quiz_id_fkey";

-- DropForeignKey
ALTER TABLE "quizAttempt" DROP CONSTRAINT "quizAttempt_student_id_fkey";

-- DropForeignKey
ALTER TABLE "quizQuestionOptions" DROP CONSTRAINT "quizQuestionOptions_question_id_fkey";

-- DropForeignKey
ALTER TABLE "quizQuestions" DROP CONSTRAINT "quizQuestions_quiz_id_fkey";

-- DropForeignKey
ALTER TABLE "quizzes" DROP CONSTRAINT "quizzes_module_id_fkey";

-- AlterTable
ALTER TABLE "modules" ADD COLUMN     "course_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "assignmentSubmissions";

-- DropTable
DROP TABLE "assignments";

-- DropTable
DROP TABLE "quizAnswerSubmissions";

-- DropTable
DROP TABLE "quizAttempt";

-- DropTable
DROP TABLE "quizQuestionOptions";

-- DropTable
DROP TABLE "quizQuestions";

-- DropTable
DROP TABLE "quizzes";

-- DropEnum
DROP TYPE "QuizQuestionOptionSerial";

-- AddForeignKey
ALTER TABLE "modules" ADD CONSTRAINT "modules_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
