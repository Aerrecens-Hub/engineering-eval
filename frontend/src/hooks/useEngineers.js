import { api, peek } from "../services/api";
import { useAsync } from "./useAsync";
export function useEngineers() {
  return useAsync(
    ({ fresh }) => api.getEngineers({ fresh }),
    () => peek("/api/engineers") ?? null,
  );
}
