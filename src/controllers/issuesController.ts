import { Request, Response, NextFunction } from "express";
import { catchAsyncError } from "../middlewares/catchAsyncError";
import ErrorHandlerClass from "../utils/errorClass";

export const createIssue = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Your issue creation logic here
    } catch (error) {
        next(new ErrorHandlerClass("Unable to create issue", 400)); // Adjust error handling as necessary
    }
});



export const sendMessage = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    res.send("Unable to send message or issue")
});

