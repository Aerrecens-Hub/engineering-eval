# Rust service

Local HTTP service for the task statistics exercise. `POST /statistics` accepts JSON and responds with JSON. The statistics logic is not implemented.

## Run

From the repository root:

```bash
cd services/rust
cargo run
```

The service listens at http://localhost:8082.

Requires Rust with Cargo. No database, credentials, or external services.
