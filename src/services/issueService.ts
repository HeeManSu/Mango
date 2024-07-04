import { IssueBodyData } from "../interfaces/issueInterface";
import issueRepository from "../repositories/issueRepository";
import ErrorHandlerClass from "../utils/errorClass";
import { Prisma } from "@prisma/client";

class IssueService {
    async createIssue(issueData: IssueBodyData) {
        const { title, description, state, priority, customerName, teamMemberName } = issueData;

        const organization = await issueRepository.findOrganization();

        if (!organization) {
            throw new ErrorHandlerClass("Organization Not found", 404);
        }

        const newIssue = await issueRepository.transaction(async (trx: Prisma.TransactionClient) => {
            const customer = await trx.customer.findFirst({
                where: {
                    name: { contains: customerName as string, mode: 'insensitive' }
                }
            });

            if (!customer) {
                throw new ErrorHandlerClass("Customer Not Found", 404);
            }

            const teamMember = await trx.organization_People.findFirst({
                where: { name: { contains: teamMemberName as string, mode: 'insensitive' } }
            });

            if (!teamMember) {
                throw new ErrorHandlerClass('Team member not found', 404);
            }

            const issue = await trx.issue.create({
                data: {
                    title,
                    description,
                    priority,
                    state,
                    customer: { connect: { customer_id: customer.customer_id } },
                    team_member: { connect: { team_member_id: teamMember.team_member_id } },
                    organization: { connect: { organization_id: organization.organization_id } },
                },
                include: {
                    customer: true,
                    team_member: true,
                    organization: true
                },
            });
            return issue;
        });
        return newIssue;
    }
}

export default new IssueService();