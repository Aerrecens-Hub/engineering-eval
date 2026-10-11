import { api, peek } from "../services/api";
import { useAsync } from "./useAsync";
function readDashboard() {
  const engineers = peek("/api/engineers");
  const projects = peek("/api/projects");
  const tasks = peek("/api/tasks");
  const activity = peek("/api/activity");
  if (!engineers || !projects || !tasks || !activity) {
    return null;
  }
  return { engineers, projects, tasks, activity };
}
export function useDashboard() {
  return useAsync(async ({ fresh }) => {
    const [engineers, projects, tasks, activity] = await Promise.all([
      api.getEngineers({ fresh }),
      api.getProjects({ fresh }),
      api.getTasks({ fresh }),
      api.getActivity({ fresh }),
    ]);
    return { engineers, projects, tasks, activity };
  }, readDashboard);
}
