import { Router } from "express";
import { createIssue, sendMessage } from "../controllers/issuesController";

const issueRoutes: Router = Router();

issueRoutes.post('/issues/create', createIssue);
issueRoutes.get('/issues/create', sendMessage);

export default issueRoutes;