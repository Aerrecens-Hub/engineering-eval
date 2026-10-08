import { api, peek } from "../services/api";
import { useAsync } from "./useAsync";
function readProjectsPage() {
  const projects = peek("/api/projects");
  const engineers = peek("/api/engineers");
  if (!projects || !engineers) {
    return null;
  }
  return { projects, engineers };
}
export function useProjectsPage() {
  return useAsync(async ({ fresh }) => {
    const [projects, engineers] = await Promise.all([
      api.getProjects({ fresh }),
      api.getEngineers({ fresh }),
    ]);
    return { projects, engineers };
  }, readProjectsPage);
}
