import { api, peek } from "../services/api";
import { useAsync } from "./useAsync";
function readActivityPage() {
  const activity = peek("/api/activity");
  const engineers = peek("/api/engineers");
  if (!activity || !engineers) {
    return null;
  }
  return { activity, engineers };
}
export function useActivityPage() {
  return useAsync(async ({ fresh }) => {
    const [activity, engineers] = await Promise.all([
      api.getActivity({ fresh }),
      api.getEngineers({ fresh }),
    ]);
    return { activity, engineers };
  }, readActivityPage);
}
