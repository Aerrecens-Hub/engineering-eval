import { findAllProjects } from "../repositories/projectsRepository.js";
export function listProjects() {
  return findAllProjects();
}
