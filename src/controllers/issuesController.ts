import { Request, Response, NextFunction } from "express";
import { catchAsyncError } from "../middlewares/catchAsyncError";
import ErrorHandlerClass from "../utils/errorClass";
import prisma from "../config/primsa-client";
import issueService from "../services/issueService";

export const createIssue = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    // const { title, description, state, priority, customerName, team_memberName } = req.body;

    try {
        const newIssue = await issueService.createIssue(req.body);

        res.status(201).json({
            success: true,
            message: "New issue created",
            issue: newIssue,
        });

    } catch (error) {
        // next(new ErrorHandlerClass("Unable to create issue", 400));
        console.error(error);
    }
});



export const sendMessage = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    res.send("Unable to send message or issue")
});

