import { Request, Response, NextFunction } from 'express';

export const catchAsyncError = (passedFunction: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(passedFunction(req, res, next)).catch(next);
    };
};