import { projects } from "../data/seed.js";
export function findAllProjects() {
  return projects.map((project) => ({ ...project }));
}
