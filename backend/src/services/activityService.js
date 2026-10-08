import { findAllActivities } from "../repositories/activityRepository.js";
export function listActivity() {
  return findAllActivities();
}
