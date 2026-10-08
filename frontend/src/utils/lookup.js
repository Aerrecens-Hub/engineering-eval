const nameIndexes = new WeakMap();
export function lookupName(records, id) {
  let index = nameIndexes.get(records);
  if (!index) {
    index = new Map(records.map((record) => [record.id, record.name]));
    nameIndexes.set(records, index);
  }
  return index.get(id) ?? "Unknown";
}
