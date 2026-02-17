const STORAGE_KEY = "logActivity";

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

function getCurrentHour() {
  return String(new Date().getHours());
}

export function getActivity() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

export function logActivity(activitylog) {
  const log = getActivity();
  const today = getTodayKey();
  const hour = getCurrentHour();

  if (!log[today]) log[today] = {};
  if (!log[today][hour]) log[today][hour] = {};
  if (!log[today][hour][activitylog.key]) log[today][hour][activitylog.key] = 0;

  log[today][hour][activitylog.key] += 1;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
}
