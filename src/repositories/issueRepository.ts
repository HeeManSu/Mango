import { Prisma } from "@prisma/client";
import prisma from "../config/primsa-client";
import { IssueCreateData } from "../interfaces/issueInterface";

class IssueRepository {
    async findOrganization() {
        return prisma.organization.findFirst();
    }

    async findCustomerByName(customerName: string) {
        return prisma.customer.findFirst({
            where: {
                OR: [
                    { name: { contains: customerName, mode: 'insensitive' } }
                ],
            },
        });
    }

    async findTeamMemberByName(teamMemberName: string) {
        return prisma.organization_People.findFirst({
            where: {
                name: { contains: teamMemberName, mode: 'insensitive' }
            },
        });
    }

    async createIssue(data: IssueCreateData) {
        return prisma.issue.create({ data });
    }

    async transaction(callback: (trx: Prisma.TransactionClient) => Promise<any>) {
        return prisma.$transaction(callback);
    }
}

export default new IssueRepository();