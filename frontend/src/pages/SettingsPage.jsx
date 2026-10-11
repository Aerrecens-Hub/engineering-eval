import { Card } from "../components/Card";
import { PageHeader } from "../components/PageHeader";
export function SettingsPage() {
  return (
    <section>
      <PageHeader
        title="Settings"
        description="Local workspace defaults for this environment."
      />
      <div className="stack">
        <Card title="Environment">
          <dl className="definition-list">
            <div>
              <dt>Workspace</dt>
              <dd>Platform</dd>
            </div>
            <div>
              <dt>Data source</dt>
              <dd>In-memory seed data</dd>
            </div>
            <div>
              <dt>Authentication</dt>
              <dd>Not required</dd>
            </div>
            <div>
              <dt>API</dt>
              <dd>/api</dd>
            </div>
          </dl>
        </Card>
        <Card title="Preferences">
          <p className="state">
            No saved preferences. This workspace uses the default display
            settings.
          </p>
        </Card>
      </div>
    </section>
  );
}
