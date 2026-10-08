import { DataState } from "../components/DataState";
import { PageHeader } from "../components/PageHeader";
import { StatusBadge } from "../components/StatusBadge";
import { useTasksPage } from "../hooks/useTasksPage";
import { lookupName } from "../utils/lookup";
export function TasksPage() {
  const { data, error, loading, reload } = useTasksPage();
  return (
    <section>
      <PageHeader
        title="Tasks"
        description="Work items assigned across projects."
      />
      <DataState
        loading={loading}
        error={error}
        empty={data?.tasks.length === 0}
        emptyMessage="No tasks yet."
        onRetry={reload}
      >
        {data ? (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Project</th>
                  <th>Assignee</th>
                  <th>Priority</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>{lookupName(data.projects, task.projectId)}</td>
                    <td>{lookupName(data.engineers, task.assigneeId)}</td>
                    <td>
                      <StatusBadge value={task.priority} />
                    </td>
                    <td>
                      <StatusBadge value={task.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </DataState>
    </section>
  );
}
