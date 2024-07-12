import { Prisma, Sprint } from "@prisma/client";
import sprintRepository from "../repositories/sprintRepository";
import { SprintBodyInput } from "../interfaces/sprintInterface";
import ErrorHandlerClass from "../utils/errorClass";


class SprintService {
    async createSprint(sprintData: SprintBodyInput): Promise<Sprint> {
        const { name, description, start_date, end_date, status } = sprintData;

        if (!name.trim()) {
            throw new ErrorHandlerClass("Sprint name is required", 400);
        }

        const organization = await sprintRepository.findOrganization();

        if (!organization) {
            throw new ErrorHandlerClass("Organization Not found", 404);
        };

        const newSprint = await sprintRepository.transaction(async (trx: Prisma.TransactionClient) => {

            const sprint = await trx.sprint.create({
                data: {
                    name,
                    description,
                    start_date,
                    end_date,
                    status,
                    organization: { connect: { organization_id: organization.organization_id } }
                },
                include: {
                    organization: true
                }
            });

            return sprint;
        })
        return newSprint;
    };

    async getAllSprints(): Promise<Sprint[]> {

        return await sprintRepository.getAllSprints();
    }

    async updateSprint(sprint_id: number, sprintData: Partial<SprintBodyInput>): Promise<Sprint> {
        const updatedSprint = await sprintRepository.transaction(async (trx: Prisma.TransactionClient) => {
            const sprint = await sprintRepository.updateSprint(sprint_id, sprintData, trx);

            if (!sprint) {
                throw new ErrorHandlerClass("Sprint Not Found", 404);
            }

            return sprint;
        });

        return updatedSprint;
    }
}

export default new SprintService();