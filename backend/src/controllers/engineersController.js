import { listEngineers } from "../services/engineersService.js";
export function getEngineers(_req, res) {
  res.json(listEngineers());
}
