-- CreateEnum
CREATE TYPE "State" AS ENUM ('todo', 'backlog', 'progress', 'completed');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('high', 'low', 'medium');

-- CreateTable
CREATE TABLE "issues" (
    "issue_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "state" "State" DEFAULT 'todo',
    "priority" "Priority" DEFAULT 'low',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "issues_pkey" PRIMARY KEY ("issue_id")
);

-- AddForeignKey
ALTER TABLE "issues" ADD CONSTRAINT "issues_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;
