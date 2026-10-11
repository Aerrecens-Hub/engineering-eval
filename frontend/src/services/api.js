const values = new Map();
const inflight = new Map();

export function peek(path) {
  return values.has(path) ? values.get(path) : undefined;
}

async function request(path, options) {
  const fresh = options?.fresh === true;

  if (!fresh && values.has(path)) {
    return values.get(path);
  }

  if (!fresh) {
    const pending = inflight.get(path);
    if (pending) {
      return pending;
    }
  }

  const pending = load(path);
  inflight.set(path, pending);

  try {
    const data = await pending;
    if (inflight.get(path) === pending) {
      values.set(path, data);
    }
    return data;
  } finally {
    if (inflight.get(path) === pending) {
      inflight.delete(path);
    }
  }
}

async function load(path) {
  let response;

  try {
    response = await fetch(path);
  } catch {
    throw new Error(
      "Could not reach the API. Make sure the backend is running.",
    );
  }

  if (!response.ok) {
    throw new Error(`Request to ${path} failed (${response.status}).`);
  }

  return response.json();
}

export const api = {
  getEngineers(options) {
    return request("/api/engineers", options);
  },

  getProjects(options) {
    return request("/api/projects", options);
  },

  getTasks(options) {
    return request("/api/tasks", options);
  },

  getActivity(options) {
    return request("/api/activity", options);
  },
};
