import { DataState } from "../components/DataState";
import { PageHeader } from "../components/PageHeader";
import { StatusBadge } from "../components/StatusBadge";
import { useActivityPage } from "../hooks/useActivityPage";
import { formatDateTime } from "../utils/format";
import { lookupName } from "../utils/lookup";
export function ActivityPage() {
  const { data, error, loading, reload } = useActivityPage();
  return (
    <section>
      <PageHeader
        title="Activity"
        description="Recent commits, reviews, deployments, and completed tasks."
      />
      <DataState
        loading={loading}
        error={error}
        empty={data?.activity.length === 0}
        emptyMessage="No activity yet."
        onRetry={reload}
      >
        {data ? (
          <ul className="activity-list card">
            {data.activity.map((item) => (
              <li key={item.id} className="activity-item">
                <div className="activity-meta">
                  <StatusBadge value={item.type} />
                  <span>{formatDateTime(item.createdAt)}</span>
                  <span>{lookupName(data.engineers, item.engineerId)}</span>
                </div>
                <p>{item.message}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </DataState>
    </section>
  );
}
