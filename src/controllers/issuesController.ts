import { Request, Response, NextFunction } from "express";
import { catchAsyncError } from "../middlewares/catchAsyncError";
import ErrorHandlerClass from "../utils/errorClass";
import prisma from "../config/primsa-client";

export const createIssue = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organization_id = await prisma.$queryRaw`SELECT organization_id FROM organizations`
        console.log("organization_id: ", organization_id);


    } catch (error) {
        console.error(error)
    }
});



export const sendMessage = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    res.send("Unable to send message or issue")
});

