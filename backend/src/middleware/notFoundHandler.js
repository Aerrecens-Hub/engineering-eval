export function notFoundHandler(_req, res) {
  res.status(404).json({ error: "Not found" });
}
