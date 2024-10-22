import { IssueBodyData } from "../interfaces/issueInterface";
import issueRepository from "../repositories/issueRepository";
import ErrorHandlerClass from "../utils/errorClass";
import { Issue, Prisma } from "@prisma/client";

class IssueService {
    async createIssue(issueData: IssueBodyData): Promise<Issue> {
        const { title, description, state, priority, customerName, teamMemberName, sprintName } = issueData;

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

            let sprint = null;
            if (sprintName) {
                sprint = await trx.sprint.findFirst({
                    where: {
                        name: {
                            contains: sprintName as string, mode: 'insensitive'
                        }
                    }
                })
                if (!sprint) {
                    throw new ErrorHandlerClass('Sprint Not found', 404)
                }
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
                    ...(sprint && { sprint: { connect: { sprint_id: sprint.sprint_id } } })
                },
                include: {
                    customer: true,
                    team_member: true,
                    organization: true,
                    sprint: true
                },
            });
            return issue;
        });
        return newIssue;
    }

    async getAllIssues(): Promise<Issue[]> {
        const organization = await issueRepository.findOrganization();

        if (!organization) {
            throw new ErrorHandlerClass("Organization Not found", 404);
        }

        return await issueRepository.getAllIssues();
    }

    async updateIssue(issue_id: number, issueData: Partial<IssueBodyData>): Promise<Issue> {

        const { sprintName, ...rest } = issueData;

        const updateIssue = await issueRepository.transaction(async (trx: Prisma.TransactionClient) => {
            let sprint = null;
            if (sprintName) {
                sprint = await trx.sprint.findFirst({
                    where: {
                        name: {
                            contains: sprintName, mode: 'insensitive'
                        }
                    }
                })
                if (!sprint) {
                    throw new ErrorHandlerClass('Sprint not found', 404);
                }
            }

            const issue = await issueRepository.updateIssue(issue_id, {
                ...rest,
                ...(sprint && { sprint: { connect: { sprint_id: sprint.sprint_id } } })
            }, trx)

            return issue;
        })





        if (!updateIssue) {
            throw new ErrorHandlerClass("Issue Not Found", 404);
        }

        return updateIssue;
    }

    async deleteIssue(issue_id: number): Promise<Issue> {
        const deleteIssue = await issueRepository.deleteIssue(issue_id);

        return deleteIssue;
    }
}

export default new IssueService();