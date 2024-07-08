import { Customer, Issue, Organization, Organization_People, Prisma } from "@prisma/client";
import prisma from "../config/primsa-client";
import { IssueCreateData } from "../interfaces/issueInterface";

class IssueRepository {
    async findOrganization(): Promise<Organization | null> {
        return prisma.organization.findFirst();
    }

    async findCustomerByName(customerName: string): Promise<Customer | null> {
        return prisma.customer.findFirst({
            where: {
                OR: [
                    { name: { contains: customerName, mode: 'insensitive' } }
                ],
            },
        });
    }

    async findTeamMemberByName(teamMemberName: string): Promise<Organization_People | null> {
        return prisma.organization_People.findFirst({
            where: {
                name: { contains: teamMemberName, mode: 'insensitive' }
            },
        });
    }

    async isIssuePresent(issue_id: number): Promise<boolean> {
        const issue = await prisma.issue.findUnique({
            where: { issue_id }
        });

        return issue !== null;
    }

    async createIssue(data: IssueCreateData): Promise<Issue> {
        return prisma.issue.create({ data });
    }

    async getAllIssues(): Promise<Issue[]> {
        return prisma.issue.findMany({
            include: {
                customer: true,
                team_member: true,
                organization: true,
                sprint: true
            },
        });
    }

    async updateIssue(issue_id: number, data: Partial<IssueCreateData>, trx?: Prisma.TransactionClient) {

        const client = trx || prisma;

        return await client.issue.update({
            where: { issue_id },
            data,
            include: {
                customer: true,
                team_member: true,
                organization: true,
                sprint: true
            }
        });
    }

    async deleteIssue(issue_id: number): Promise<Issue> {
        return await prisma.issue.delete({
            where: { issue_id }
        });
    }

    async transaction(callback: (trx: Prisma.TransactionClient) => Promise<any>): Promise<any> {
        return prisma.$transaction(callback);
    }
}

export default new IssueRepository();