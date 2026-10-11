# Go service

Local HTTP service for the activity aggregation exercise. `POST /aggregate` accepts JSON and responds with JSON. The aggregation logic is not implemented.

## Run

From the repository root:

```bash
cd services/go
go run .
```

The service listens at http://localhost:8080.

Requires Go 1.22 or newer. No database, credentials, or external services.
