const labels = {
  active: "Active",
  inactive: "Inactive",
  completed: "Completed",
  paused: "Paused",
  todo: "To do",
  in_progress: "In progress",
  done: "Done",
  low: "Low",
  medium: "Medium",
  high: "High",
  commit: "Commit",
  review: "Review",
  deployment: "Deployment",
  task_completed: "Task completed",
};
export function labelFor(value) {
  return labels[value] ?? value;
}
