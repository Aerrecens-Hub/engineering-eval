import { activities } from "../data/seed.js";
export function findAllActivities() {
  return activities.map((activity) => ({ ...activity }));
}
