import { NextFunction, Request, Response } from "express";
import sprintService from "../services/sprintService";
import ErrorHandlerClass from "../utils/errorClass";
import { SprintBodyInput } from "../interfaces/sprintInterface";

export const createSprint = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {

        const newSprint = await sprintService.createSprint(req.body);

        res.status(201).json({
            success: true,
            message: "New Sprint created",
            sprint: newSprint,
        });

    } catch (error) {
        next(new ErrorHandlerClass("Unable to create issue", 500));
    }
};

export const getAllSprints = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const allSprints = await sprintService.getAllSprints();

        res.status(200).json({
            success: true,
            message: "All sprints fetched",
            sprints: allSprints
        });
    } catch (error) {
        next(new ErrorHandlerClass("Failed to fetch sprints", 500));
    }
};

export const updateSprint = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { sprint_id } = req.params;
        const updateData: Partial<SprintBodyInput> = req.body;

        const updatedSprint = await sprintService.updateSprint(Number(sprint_id), updateData);

        res.status(200).json({
            success: true,
            message: "Sprint updated successfully",
            sprint: updatedSprint,
        });
    } catch (error) {
        next(new ErrorHandlerClass("Unable to update the sprint", 500));
    }
};

export const deleteSprintController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { sprint_id } = req.params;
        const isSprint: boolean = await sprintService.checkSprintExist(Number(sprint_id));

        if (!isSprint) {
            return next(new ErrorHandlerClass('Sprint you are trying to delete does not exist', 404));
        }

        const deletedSprint = await sprintService.deleteSprintService(Number(sprint_id));

        res.status(200).json({
            success: true,
            message: "Sprint deleted successfully",
            deletedSprint: deletedSprint
        });
    } catch (error) {
        next(new ErrorHandlerClass("Unable to delete the sprint", 500));
    }
}