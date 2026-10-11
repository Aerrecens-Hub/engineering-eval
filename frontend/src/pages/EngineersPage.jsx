import { DataState } from "../components/DataState";
import { PageHeader } from "../components/PageHeader";
import { StatusBadge } from "../components/StatusBadge";
import { useEngineers } from "../hooks/useEngineers";
export function EngineersPage() {
  const { data, error, loading, reload } = useEngineers();
  return (
    <section>
      <PageHeader
        title="Engineers"
        description="People on the platform team."
      />
      <DataState
        loading={loading}
        error={error}
        empty={data?.length === 0}
        emptyMessage="No engineers yet."
        onRetry={reload}
      >
        {data ? (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((engineer) => (
                  <tr key={engineer.id}>
                    <td>{engineer.name}</td>
                    <td>{engineer.role}</td>
                    <td>
                      <StatusBadge value={engineer.status} />
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
