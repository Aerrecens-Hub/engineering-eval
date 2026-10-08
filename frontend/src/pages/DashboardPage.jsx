import { Card } from "../components/Card";
import { DataState } from "../components/DataState";
import { PageHeader } from "../components/PageHeader";
import { StatusBadge } from "../components/StatusBadge";
import { useDashboard } from "../hooks/useDashboard";
import { formatDateTime } from "../utils/format";
import { lookupName } from "../utils/lookup";
export function DashboardPage() {
  const { data, error, loading, reload } = useDashboard();
  const activeEngineers =
    data?.engineers.filter((engineer) => engineer.status === "active").length ??
    0;
  const activeProjects =
    data?.projects.filter((project) => project.status === "active").length ?? 0;
  const openTasks =
    data?.tasks.filter((task) => task.status !== "done").length ?? 0;
  const recentActivity = data?.activity.slice(0, 6) ?? [];
  return (
    <section>
      <PageHeader
        title="Dashboard"
        description="Current work across the platform team."
      />
      <DataState
        loading={loading}
        error={error}
        empty={false}
        emptyMessage=""
        onRetry={reload}
      >
        {data ? (
          <>
            <div className="stat-grid">
              <Card>
                <p className="stat-label">Engineers</p>
                <p className="stat-value">{data.engineers.length}</p>
                <p className="stat-hint">{activeEngineers} active</p>
              </Card>
              <Card>
                <p className="stat-label">Projects</p>
                <p className="stat-value">{data.projects.length}</p>
                <p className="stat-hint">{activeProjects} active</p>
              </Card>
              <Card>
                <p className="stat-label">Open tasks</p>
                <p className="stat-value">{openTasks}</p>
                <p className="stat-hint">{data.tasks.length} total</p>
              </Card>
              <Card>
                <p className="stat-label">Activity</p>
                <p className="stat-value">{data.activity.length}</p>
                <p className="stat-hint">Newest first</p>
              </Card>
            </div>
            <Card title="Recent activity">
              {recentActivity.length === 0 ? (
                <p className="state">No activity yet.</p>
              ) : (
                <ul className="activity-list">
                  {recentActivity.map((item) => (
                    <li key={item.id} className="activity-item">
                      <div className="activity-meta">
                        <StatusBadge value={item.type} />
                        <span>{formatDateTime(item.createdAt)}</span>
                        <span>
                          {lookupName(data.engineers, item.engineerId)}
                        </span>
                      </div>
                      <p>{item.message}</p>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </>
        ) : null}
      </DataState>
    </section>
  );
}
