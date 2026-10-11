import { engineers } from "../data/seed.js";
export function findAllEngineers() {
  return engineers.map((engineer) => ({ ...engineer }));
}
