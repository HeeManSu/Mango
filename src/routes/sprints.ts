import { Router } from "express";
import { createSprint, getAllSprints, updateSprint } from "../controllers/sprintController";

const sprintRoutes: Router = Router();

sprintRoutes.post('/sprints/create', createSprint);
sprintRoutes.get('/sprints', getAllSprints);
sprintRoutes.patch('/sprints/update/:sprint_id', updateSprint)

export default sprintRoutes;