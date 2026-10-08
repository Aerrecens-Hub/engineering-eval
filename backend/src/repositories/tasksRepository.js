import { tasks } from "../data/seed.js";
export function findAllTasks() {
  return tasks.map((task) => ({ ...task }));
}
