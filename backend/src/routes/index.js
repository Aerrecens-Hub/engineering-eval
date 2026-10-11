import { Router } from "express";
import { getActivity } from "../controllers/activityController.js";
import { getEngineers } from "../controllers/engineersController.js";
import { getProjects } from "../controllers/projectsController.js";
import { getTasks } from "../controllers/tasksController.js";

export const apiRouter = Router();

apiRouter.get("/engineers", getEngineers);
apiRouter.get("/projects", getProjects);
apiRouter.get("/tasks", getTasks);
apiRouter.get("/activity", getActivity);
