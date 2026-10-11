import { findAllTasks } from "../repositories/tasksRepository.js";
export function listTasks() {
  return findAllTasks();
}
