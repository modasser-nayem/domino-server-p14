/*
  Warnings:

  - You are about to drop the column `duration` on the `modules` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `modules` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AssignmentStatus" AS ENUM ('pending', 'graded', 'resubmitted');

-- CreateEnum
CREATE TYPE "QuizQuestionOptionSerial" AS ENUM ('A', 'B', 'C', 'D');

-- AlterTable
ALTER TABLE "modules" DROP COLUMN "duration",
DROP COLUMN "url";

-- CreateTable
CREATE TABLE "textContents" (
    "id" TEXT NOT NULL,
    "module_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "textContents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "videoContents" (
    "id" TEXT NOT NULL,
    "module_id" TEXT NOT NULL,
    "video_url" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "videoContents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assignments" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "marks" INTEGER NOT NULL,
    "module_id" TEXT NOT NULL,

    CONSTRAINT "assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assignmentSubmissions" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "assignment_id" TEXT NOT NULL,
    "submission_content" TEXT NOT NULL,
    "status" "AssignmentStatus" NOT NULL,
    "marks_obtained" INTEGER NOT NULL,
    "resubmit_count" INTEGER NOT NULL,
    "submit_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assignmentSubmissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quizzes" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "due_time" INTEGER,
    "marks" INTEGER NOT NULL,
    "module_id" TEXT NOT NULL,

    CONSTRAINT "quizzes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quizQuestions" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "quiz_id" TEXT NOT NULL,

    CONSTRAINT "quizQuestions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quizQuestionOptions" (
    "id" TEXT NOT NULL,
    "option" TEXT NOT NULL,
    "is_correct" BOOLEAN NOT NULL,
    "serial" "QuizQuestionOptionSerial" NOT NULL,
    "question_id" TEXT NOT NULL,

    CONSTRAINT "quizQuestionOptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quizAttempt" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "quiz_id" TEXT NOT NULL,
    "marks_obtained" INTEGER NOT NULL,
    "attempt_time" INTEGER NOT NULL,

    CONSTRAINT "quizAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quizAnswerSubmissions" (
    "id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "option_id" TEXT NOT NULL,
    "attempt_id" TEXT NOT NULL,

    CONSTRAINT "quizAnswerSubmissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "textContents_module_id_key" ON "textContents"("module_id");

-- CreateIndex
CREATE UNIQUE INDEX "videoContents_module_id_key" ON "videoContents"("module_id");

-- CreateIndex
CREATE UNIQUE INDEX "assignments_module_id_key" ON "assignments"("module_id");

-- CreateIndex
CREATE UNIQUE INDEX "quizzes_module_id_key" ON "quizzes"("module_id");

-- AddForeignKey
ALTER TABLE "textContents" ADD CONSTRAINT "textContents_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videoContents" ADD CONSTRAINT "videoContents_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignmentSubmissions" ADD CONSTRAINT "assignmentSubmissions_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignmentSubmissions" ADD CONSTRAINT "assignmentSubmissions_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quizQuestions" ADD CONSTRAINT "quizQuestions_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quizzes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quizQuestionOptions" ADD CONSTRAINT "quizQuestionOptions_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "quizQuestions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quizAttempt" ADD CONSTRAINT "quizAttempt_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quizAttempt" ADD CONSTRAINT "quizAttempt_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quizzes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quizAnswerSubmissions" ADD CONSTRAINT "quizAnswerSubmissions_attempt_id_fkey" FOREIGN KEY ("attempt_id") REFERENCES "quizAttempt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
