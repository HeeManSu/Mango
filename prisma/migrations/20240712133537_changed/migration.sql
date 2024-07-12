/*
  Warnings:

  - The primary key for the `customers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `issues` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `organization_people` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `organizations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `sprints` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "customers" DROP CONSTRAINT "customers_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "issues" DROP CONSTRAINT "issues_customerId_fkey";

-- DropForeignKey
ALTER TABLE "issues" DROP CONSTRAINT "issues_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "issues" DROP CONSTRAINT "issues_sprintId_fkey";

-- DropForeignKey
ALTER TABLE "issues" DROP CONSTRAINT "issues_team_memberId_fkey";

-- DropForeignKey
ALTER TABLE "organization_people" DROP CONSTRAINT "organization_people_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "sprints" DROP CONSTRAINT "sprints_organizationId_fkey";

-- AlterTable
ALTER TABLE "customers" DROP CONSTRAINT "customers_pkey",
ALTER COLUMN "customer_id" DROP DEFAULT,
ALTER COLUMN "customer_id" SET DATA TYPE TEXT,
ALTER COLUMN "organizationId" SET DATA TYPE TEXT,
ADD CONSTRAINT "customers_pkey" PRIMARY KEY ("customer_id");
DROP SEQUENCE "customers_customer_id_seq";

-- AlterTable
ALTER TABLE "issues" DROP CONSTRAINT "issues_pkey",
ALTER COLUMN "issue_id" DROP DEFAULT,
ALTER COLUMN "issue_id" SET DATA TYPE TEXT,
ALTER COLUMN "customerId" SET DATA TYPE TEXT,
ALTER COLUMN "team_memberId" SET DATA TYPE TEXT,
ALTER COLUMN "organizationId" SET DATA TYPE TEXT,
ALTER COLUMN "sprintId" SET DATA TYPE TEXT,
ADD CONSTRAINT "issues_pkey" PRIMARY KEY ("issue_id");
DROP SEQUENCE "issues_issue_id_seq";

-- AlterTable
ALTER TABLE "organization_people" DROP CONSTRAINT "organization_people_pkey",
ALTER COLUMN "team_member_id" DROP DEFAULT,
ALTER COLUMN "team_member_id" SET DATA TYPE TEXT,
ALTER COLUMN "organizationId" SET DATA TYPE TEXT,
ADD CONSTRAINT "organization_people_pkey" PRIMARY KEY ("team_member_id");
DROP SEQUENCE "organization_people_team_member_id_seq";

-- AlterTable
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_pkey",
ALTER COLUMN "organization_id" DROP DEFAULT,
ALTER COLUMN "organization_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "organizations_pkey" PRIMARY KEY ("organization_id");
DROP SEQUENCE "organizations_organization_id_seq";

-- AlterTable
ALTER TABLE "sprints" DROP CONSTRAINT "sprints_pkey",
ALTER COLUMN "sprint_id" DROP DEFAULT,
ALTER COLUMN "sprint_id" SET DATA TYPE TEXT,
ALTER COLUMN "organizationId" SET DATA TYPE TEXT,
ADD CONSTRAINT "sprints_pkey" PRIMARY KEY ("sprint_id");
DROP SEQUENCE "sprints_sprint_id_seq";

-- AddForeignKey
ALTER TABLE "organization_people" ADD CONSTRAINT "organization_people_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("organization_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("organization_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issues" ADD CONSTRAINT "issues_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issues" ADD CONSTRAINT "issues_team_memberId_fkey" FOREIGN KEY ("team_memberId") REFERENCES "organization_people"("team_member_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issues" ADD CONSTRAINT "issues_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("organization_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issues" ADD CONSTRAINT "issues_sprintId_fkey" FOREIGN KEY ("sprintId") REFERENCES "sprints"("sprint_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sprints" ADD CONSTRAINT "sprints_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("organization_id") ON DELETE RESTRICT ON UPDATE CASCADE;
