import { Router } from "express";
import { createIssue, sendMessage } from "../controllers/issuesController";

const issueRoutes: Router = Router();

issueRoutes.post('/create', createIssue);
issueRoutes.get('/create', sendMessage);

export default issueRoutes;