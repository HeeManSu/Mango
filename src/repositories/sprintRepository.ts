import { Organization, Prisma, Sprint } from "@prisma/client";
import prisma from "../config/primsa-client";

class SprintRepository {
    async createSprint(data: Prisma.SprintCreateInput): Promise<Sprint> {
        return await prisma.sprint.create({ data });
    }

    async findOrganization(): Promise<Organization | null> {
        return prisma.organization.findFirst();
    }

    async findSprintById(sprint_id: number): Promise<Sprint | null> {
        return await prisma.sprint.findUnique({
            where: { sprint_id }
        });
    }

    async getAllSprints(): Promise<Sprint[]> {
        return await prisma.sprint.findMany({
            include: {
                organization: true,
                issue: {
                    include: {
                        team_member: true,
                        organization: true,
                    }
                }
            },
        });
    }

    async updateSprint(sprint_id: number, data: Partial<Sprint>, trx?: Prisma.TransactionClient): Promise<Sprint | null> {
        const client = trx || prisma;
        return await client.sprint.update({
            where: { sprint_id },
            data,
            include: {
                issue: true,
            },
        });
    }

    async deleteSprint(sprint_id: number, trx?: Prisma.TransactionClient): Promise<Sprint | null> {
        const client = trx || prisma;

        return await client.sprint.delete({
            where: { sprint_id }
        });
    }

    async transaction(callback: (trx: Prisma.TransactionClient) => Promise<any>): Promise<any> {
        return prisma.$transaction(callback);
    }
}


export default new SprintRepository();