import { api, peek } from "../services/api";
import { useAsync } from "./useAsync";
function readTasksPage() {
  const tasks = peek("/api/tasks");
  const projects = peek("/api/projects");
  const engineers = peek("/api/engineers");
  if (!tasks || !projects || !engineers) {
    return null;
  }
  return { tasks, projects, engineers };
}
export function useTasksPage() {
  return useAsync(async ({ fresh }) => {
    const [tasks, projects, engineers] = await Promise.all([
      api.getTasks({ fresh }),
      api.getProjects({ fresh }),
      api.getEngineers({ fresh }),
    ]);
    return { tasks, projects, engineers };
  }, readTasksPage);
}
