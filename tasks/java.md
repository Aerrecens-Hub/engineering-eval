# Java: project task metrics

**Time:** about 15–20 minutes
**Where:** `metrics` in `services/java` (`App`)
**Leave alone:** frameworks, third-party libraries, and the Node dashboard API

## Before you start

Create a new git branch from `main`, then do all of your work on that branch.

Use your name and birthday in the branch name, lowercase, with hyphens:

```bash
git checkout main
git pull
git checkout -b alex-chen-19900315
```

Example pattern: `<first>-<last>-<YYYYMMDD>`

## What you are building

The JDK HTTP server already handles `POST /metrics`. Your job is to implement the metrics calculation.

Given a list of tasks, group them by project and report how many are done. A task counts as completed only when `status` is `done`. `todo` and `in_progress` still count toward the total.

Use the existing request and metric types in the file.

## Requirements

`POST /metrics` accepts and returns JSON.

Request:

```json
{
  "tasks": [
    { "projectId": "p1", "status": "done" },
    { "projectId": "p1", "status": "todo" },
    { "projectId": "p2", "status": "done" }
  ]
}
```

Response:

```json
{
  "p1": { "total": 2, "completed": 1, "completionRate": 0.5 },
  "p2": { "total": 1, "completed": 1, "completionRate": 1.0 }
}
```

For each `projectId` in the request:

- `total` is the task count for that project
- `completed` is how many have status `done`
- `completionRate` is `completed / total`

`{ "tasks": [] }` returns `{}`. Malformed JSON returns HTTP 400.

## How to run

Java 21 or newer.

```bash
cd services/java
javac -encoding UTF-8 -d out src/main/java/App.java
java -cp out App
```

Service: http://localhost:8081

## Done when

A valid POST returns per-project totals and rates, empty tasks return `{}`, and bad JSON returns 400.
