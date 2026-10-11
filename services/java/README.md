# Java service

Local HTTP service for the project metrics exercise. `POST /metrics` accepts JSON and responds with JSON. The metrics logic is not implemented.

The JDK HTTP server is used directly. There are no third-party libraries. `pom.xml` is the build configuration and compiles `src/main/java`.

## Run

From the repository root:

```bash
cd services/java
javac -encoding UTF-8 -d out src/main/java/App.java
java -cp out App
```

The service listens at http://localhost:8081.

Requires Java 21 or newer. No database, credentials, or external services.
