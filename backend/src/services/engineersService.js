import { findAllEngineers } from "../repositories/engineersRepository.js";
export function listEngineers() {
  return findAllEngineers();
}
