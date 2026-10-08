import { listTasks } from "../services/tasksService.js";
export function getTasks(_req, res) {
  res.json(listTasks());
}
