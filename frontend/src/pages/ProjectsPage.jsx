import { DataState } from "../components/DataState";
import { PageHeader } from "../components/PageHeader";
import { StatusBadge } from "../components/StatusBadge";
import { useProjectsPage } from "../hooks/useProjectsPage";
import { lookupName } from "../utils/lookup";
export function ProjectsPage() {
  const { data, error, loading, reload } = useProjectsPage();
  return (
    <section>
      <PageHeader
        title="Projects"
        description="Products and services the team is responsible for."
      />
      <DataState
        loading={loading}
        error={error}
        empty={data?.projects.length === 0}
        emptyMessage="No projects yet."
        onRetry={reload}
      >
        {data ? (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Owner</th>
                </tr>
              </thead>
              <tbody>
                {data.projects.map((project) => (
                  <tr key={project.id}>
                    <td>{project.name}</td>
                    <td>
                      <StatusBadge value={project.status} />
                    </td>
                    <td>{lookupName(data.engineers, project.ownerId)}</td>
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
