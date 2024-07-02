/*
  Warnings:

  - You are about to drop the `Organization_People` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Organization_People" DROP CONSTRAINT "Organization_People_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "issues" DROP CONSTRAINT "issues_team_memberId_fkey";

-- DropTable
DROP TABLE "Organization_People";

-- CreateTable
CREATE TABLE "organization_people" (
    "team_member_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'member',
    "organizationId" INTEGER NOT NULL,

    CONSTRAINT "organization_people_pkey" PRIMARY KEY ("team_member_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organization_people_email_key" ON "organization_people"("email");

-- AddForeignKey
ALTER TABLE "organization_people" ADD CONSTRAINT "organization_people_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("organization_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issues" ADD CONSTRAINT "issues_team_memberId_fkey" FOREIGN KEY ("team_memberId") REFERENCES "organization_people"("team_member_id") ON DELETE RESTRICT ON UPDATE CASCADE;
