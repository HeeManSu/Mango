import { Router } from "express";
import { createIssue, deleteIssue, getAllIssues, updateIssue } from "../controllers/issuesController";

const issueRoutes: Router = Router();

issueRoutes.post('/issues/create', createIssue);
issueRoutes.get('/issues', getAllIssues);
issueRoutes.patch('/issues/:issue_id', updateIssue);
issueRoutes.delete('/issues/:issue_id', deleteIssue)


export default issueRoutes;