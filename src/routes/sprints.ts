import { Router } from "express";
import { createSprint, deleteSprintController, getAllSprints, updateSprint } from "../controllers/sprintController";

const sprintRoutes: Router = Router();

sprintRoutes.post('/sprints/create', createSprint);
sprintRoutes.get('/sprints', getAllSprints);
sprintRoutes.patch('/sprints/update/:sprint_id', updateSprint)
sprintRoutes.delete('/sprints/delete/:sprint_id', deleteSprintController)

export default sprintRoutes;