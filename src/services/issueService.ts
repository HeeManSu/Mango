import issueRepository from "../repositories/issueRepository";
import ErrorHandlerClass from "../utils/errorClass";


class IssueService {
    async createIssue(issueData: any) {
        const { title, description, state, priority, customerName, teamMemberName } = issueData;

        const organization = await issueRepository.findOrganization();

        

        if (!organization) {
            throw new ErrorHandlerClass("Organization Not found", 404);
        }

        const newIssue = await issueRepository.transaction(async (trx) => {
            const customer = await trx.customer.findFirst({
                where: {
                    name: { contains: customerName as string, mode: 'insensitive' }
                }
            });


            if (!customer) {
                throw new ErrorHandlerClass("Customer Not Found", 404)
            }

            const teamMember = await trx.organization_People.findFirst({
                where: { name: { contains: teamMemberName as string, mode: 'insensitive' } }
            });

            if (!teamMember) {
                throw new ErrorHandlerClass('Team member not found', 404)
            }

            const issue = await trx.issue.create({
                data: {
                    title,
                    description,
                    priority,
                    state,
                    customerId: customer.customer_id,
                    teamMemberId: teamMember.team_member_id,
                    organizationId: organization.organization_id,
                },
            });
            return issue;
        });
        return newIssue;
    }
}

export default new IssueService();