import { labelFor } from "../utils/labels";
const tones = {
  active: "success",
  inactive: "neutral",
  completed: "success",
  paused: "warning",
  todo: "neutral",
  in_progress: "info",
  done: "success",
  low: "neutral",
  medium: "info",
  high: "danger",
  commit: "neutral",
  review: "info",
  deployment: "success",
  task_completed: "success",
};
export function StatusBadge({ value }) {
  const tone = tones[value] ?? "neutral";
  return <span className={`badge badge-${tone}`}>{labelFor(value)}</span>;
}
