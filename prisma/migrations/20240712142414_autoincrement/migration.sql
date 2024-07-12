/*
  Warnings:

  - The primary key for the `customers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `customer_id` column on the `customers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `issues` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `issue_id` column on the `issues` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `sprintId` column on the `issues` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `organization_people` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `team_member_id` column on the `organization_people` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `organizations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `organization_id` column on the `organizations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `sprints` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `sprint_id` column on the `sprints` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `organizationId` on the `customers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `customerId` on the `issues` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `team_memberId` on the `issues` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `organizationId` on the `issues` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `organizationId` on the `organization_people` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `organizationId` on the `sprints` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

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
DROP COLUMN "customer_id",
ADD COLUMN     "customer_id" SERIAL NOT NULL,
DROP COLUMN "organizationId",
ADD COLUMN     "organizationId" INTEGER NOT NULL,
ADD CONSTRAINT "customers_pkey" PRIMARY KEY ("customer_id");

-- AlterTable
ALTER TABLE "issues" DROP CONSTRAINT "issues_pkey",
DROP COLUMN "issue_id",
ADD COLUMN     "issue_id" SERIAL NOT NULL,
DROP COLUMN "customerId",
ADD COLUMN     "customerId" INTEGER NOT NULL,
DROP COLUMN "team_memberId",
ADD COLUMN     "team_memberId" INTEGER NOT NULL,
DROP COLUMN "organizationId",
ADD COLUMN     "organizationId" INTEGER NOT NULL,
DROP COLUMN "sprintId",
ADD COLUMN     "sprintId" INTEGER,
ADD CONSTRAINT "issues_pkey" PRIMARY KEY ("issue_id");

-- AlterTable
ALTER TABLE "organization_people" DROP CONSTRAINT "organization_people_pkey",
DROP COLUMN "team_member_id",
ADD COLUMN     "team_member_id" SERIAL NOT NULL,
DROP COLUMN "organizationId",
ADD COLUMN     "organizationId" INTEGER NOT NULL,
ADD CONSTRAINT "organization_people_pkey" PRIMARY KEY ("team_member_id");

-- AlterTable
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_pkey",
DROP COLUMN "organization_id",
ADD COLUMN     "organization_id" SERIAL NOT NULL,
ADD CONSTRAINT "organizations_pkey" PRIMARY KEY ("organization_id");

-- AlterTable
ALTER TABLE "sprints" DROP CONSTRAINT "sprints_pkey",
DROP COLUMN "sprint_id",
ADD COLUMN     "sprint_id" SERIAL NOT NULL,
DROP COLUMN "organizationId",
ADD COLUMN     "organizationId" INTEGER NOT NULL,
ADD CONSTRAINT "sprints_pkey" PRIMARY KEY ("sprint_id");

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
