import { listActivity } from "../services/activityService.js";
export function getActivity(_req, res) {
  res.json(listActivity());
}
