-- CreateTable
CREATE TABLE "organizations" (
    "organization_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("organization_id")
);
