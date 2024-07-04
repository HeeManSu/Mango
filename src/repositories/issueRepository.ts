import prisma from "../config/primsa-client";


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


    async createIssue(data: any) {
        return prisma.issue.create({ data });
    }

    async transaction(callback: (trx: any) => Promise<any>) {
        return prisma.$transaction(callback);
    }
}


export default new IssueRepository();