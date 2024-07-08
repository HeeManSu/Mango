import { Organization, Prisma, Sprint } from "@prisma/client";
import prisma from "../config/primsa-client";



class SprintRepository {
    async createSprint(data: Prisma.SprintCreateInput): Promise<Sprint> {
        return await prisma.sprint.create({ data });
    }

    async findOrganization(): Promise<Organization | null> {
        return prisma.organization.findFirst();
    }

    async getAllSprints(): Promise<Sprint[]> {
        return await prisma.sprint.findMany({
            include: {
                organization: true,
            },
        });
    }

    async updateSprint(sprint_id: number, data: Partial<Sprint>): Promise<Sprint | null> {
        return await prisma.sprint.update({
            where: { sprint_id },
            data,
        });
    }


    async transaction(callback: (trx: Prisma.TransactionClient) => Promise<any>): Promise<any> {
        return prisma.$transaction(callback);
    }
}


export default new SprintRepository();