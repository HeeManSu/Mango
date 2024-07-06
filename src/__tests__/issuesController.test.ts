import { Request, Response, NextFunction } from "express";
import { createIssue, deleteIssue, getAllIssues, updateIssue } from "../controllers/issuesController";
import issueService from "../services/issueService";
import issueRepository from "../repositories/issueRepository";

jest.mock('../services/issueService');
jest.mock('../repositories/issueRepository');

describe('Issue Controller', () => {
    describe('createIssue', () => {
        it('should create a new issue and return 201 status', async () => {
            const req = {
                body: {
                    title: 'Test Issue',
                    description: 'Test Description',
                    state: 'todo',
                    priority: 'high',
                    customer: { connect: { customer_id: 1 } },
                    team_member: { connect: { team_member_id: 1 } },
                    organization: { connect: { organization_id: 1 } },
                },
            } as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            const next = jest.fn() as NextFunction;

            (issueService.createIssue as jest.Mock).mockResolvedValue(req.body);

            await createIssue(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: 'New issue created',
                issue: req.body,
            });
        })

        it('should call next with an error if issue creation fails', async () => {
            const req = {
                body: {},
            } as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            const next = jest.fn() as NextFunction;

            (issueService.createIssue as jest.Mock).mockRejectedValue(new Error('Unable to create issue'));

            await createIssue(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(Error));
        });
    });
    describe('update Issue', () => {
        it('should update an issue and return 200 status', async () => {
            const req = {
                params: { issue_id: '1' },
                body: { title: 'Updated Issue' },
            } as unknown as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;
            const next = jest.fn() as NextFunction;

            (issueService.updateIssue as jest.Mock).mockResolvedValue(req.body);

            await updateIssue(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: 'Issue updated successfully',
                issue: req.body,
            });
        })

        it('should call next with an error if issue update fails', async () => {
            const req = {
                params: { issue_id: '1' },
                body: {},
            } as unknown as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            const next = jest.fn() as NextFunction;

            (issueService.updateIssue as jest.Mock).mockRejectedValue(new Error('Unable to update issue'));

            await updateIssue(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(Error));
        });
    });
    describe('getAllIssues', () => {
        it('should fetch all issues and return 201 status', async () => {
            const req = {} as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            const next = jest.fn() as NextFunction;

            const issues = [{ title: 'Issue 1' }, { title: 'Issue 2' }];
            (issueService.getAllIssues as jest.Mock).mockResolvedValue(issues);

            await getAllIssues(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                messages: 'All issues fetched',
                issue: issues,
            });
        });

        it('should call next with an error if fetching issues fails', async () => {
            const req = {} as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            const next = jest.fn() as NextFunction;

            (issueService.getAllIssues as jest.Mock).mockRejectedValue(new Error('Failed to fetch issues'));

            await getAllIssues(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(Error));
        });
    });
    describe('deleteIssue', () => {
        it.only('should delete an issue and return 200 status', async () => {
            const req = {
                params: { issue_id: '1' },
            } as unknown as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            const next = jest.fn() as NextFunction;

            (issueRepository.isIssuePresent as jest.Mock).mockResolvedValue(true);
            (issueService.deleteIssue as jest.Mock).mockResolvedValue({});

            await deleteIssue(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: 'Issue deleted successfully',
            });
        });
        it('should return 404 if the issue does not exist', async () => {
            const req = {
                params: { issue_id: '1' },
            } as unknown as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            const next = jest.fn() as NextFunction;

            (issueRepository.isIssuePresent as jest.Mock).mockResolvedValue(false);

            await deleteIssue(req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: 'Issue not found',
            });
        });

        it('should call next with an error if issue deletion fails', async () => {
            const req = {
                params: { issue_id: '1' },
            } as unknown as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            const next = jest.fn() as NextFunction;

            (issueRepository.isIssuePresent as jest.Mock).mockResolvedValue(false);
            (issueService.deleteIssue as jest.Mock).mockRejectedValue(new Error('Unable to delete issue'));

            await deleteIssue(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(Error));
        });
    });
})
