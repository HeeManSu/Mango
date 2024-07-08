-- CreateEnum
CREATE TYPE "SprintStatus" AS ENUM ('ongoing', 'upcoming', 'completed');

-- AlterTable
ALTER TABLE "issues" ADD COLUMN     "sprintId" INTEGER;

-- CreateTable
CREATE TABLE "sprints" (
    "sprint_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "status" "SprintStatus" NOT NULL,
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "sprints_pkey" PRIMARY KEY ("sprint_id")
);

-- AddForeignKey
ALTER TABLE "issues" ADD CONSTRAINT "issues_sprintId_fkey" FOREIGN KEY ("sprintId") REFERENCES "sprints"("sprint_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sprints" ADD CONSTRAINT "sprints_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("organization_id") ON DELETE RESTRICT ON UPDATE CASCADE;
