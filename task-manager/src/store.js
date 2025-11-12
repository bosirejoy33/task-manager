// src/store.js
import { Task, TimedTask } from './Task.js';

const KEY = '670163task';

export function loadTasks() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return parsed.map(obj => {
      if (obj.type === 'TimedTask') return TimedTask.fromJSON(obj);
      return Task.fromJSON(obj);
    });
  } catch (e) {
    console.error('Failed to load tasks:', e);
    return [];
  }
}

export function saveTasks(tasks) {
  try {
    const json = JSON.stringify(tasks.map(t => t.toJSON()));
    localStorage.setItem(KEY, json);
  } catch (e) {
    console.error('Failed to save tasks:', e);
  }
}
