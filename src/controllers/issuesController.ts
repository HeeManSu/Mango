import { Request, Response, NextFunction } from "express";
import ErrorHandlerClass from "../utils/errorClass";
import issueService from "../services/issueService";
import issueRepository from "../repositories/issueRepository";

export const createIssue = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        const newIssue = await issueService.createIssue(req.body);

        res.status(201).json({
            success: true,
            message: "New issue created",
            issue: newIssue,
        });

    } catch (error) {
        next(new ErrorHandlerClass("Unable to create issue", 500));
    }
};

export const getAllIssues = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const allIssues = await issueService.getAllIssues();

        res.status(201).json({
            success: true,
            messages: "All issues fetched",
            issue: allIssues
        });
    } catch (error) {
        next(new ErrorHandlerClass("Failed to fetch issues", 500))
    }
};

export const updateIssue = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { issue_id } = req.params;

        const updatedIssue = await issueService.updateIssue(Number(issue_id), req.body);

        res.status(200).json({
            success: true,
            message: "Issue updated successfully",
            issue: updatedIssue,
        });

    } catch (error) {
        next(new ErrorHandlerClass("unable to update the issue", 500))
    }

};

export const deleteIssue = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { issue_id } = req.params;

        const isExists = await issueRepository.isIssuePresent(Number(issue_id));
        if (!isExists) {
            next(new ErrorHandlerClass("Requested issue not found", 404));
        }

        await issueService.deleteIssue(Number(issue_id));

        res.status(200).json({
            success: true,
            message: "Issue deleted successfully",
        });

    } catch (error) {
        next(new ErrorHandlerClass("Unable to delete the issue", 500));
    }
};
