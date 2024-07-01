/*
  Warnings:

  - Added the required column `team_memberId` to the `issues` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'member');

-- AlterTable
ALTER TABLE "issues" ADD COLUMN     "team_memberId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Organization_People" (
    "team_member_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'member',
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "Organization_People_pkey" PRIMARY KEY ("team_member_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_People_email_key" ON "Organization_People"("email");

-- AddForeignKey
ALTER TABLE "Organization_People" ADD CONSTRAINT "Organization_People_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("organization_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issues" ADD CONSTRAINT "issues_team_memberId_fkey" FOREIGN KEY ("team_memberId") REFERENCES "Organization_People"("team_member_id") ON DELETE RESTRICT ON UPDATE CASCADE;
