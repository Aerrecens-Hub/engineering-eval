import { listProjects } from "../services/projectsService.js";
export function getProjects(_req, res) {
  res.json(listProjects());
}
