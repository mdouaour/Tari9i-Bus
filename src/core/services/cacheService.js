const PREFIX = 'tariqi-bus';

function buildKey(key) {
  return `${PREFIX}:${key}`;
}

export function saveData(key, data) {
  try {
    localStorage.setItem(buildKey(key), JSON.stringify({ updatedAt: Date.now(), data }));
    return true;
  } catch {
    return false;
  }
}

export function loadData(key) {
  try {
    const raw = localStorage.getItem(buildKey(key));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.data ?? null;
  } catch {
    return null;
  }
}
