// src/app.js
import { Task, TimedTask } from './Task.js';
import { loadTasks, saveTasks } from './store.js';
import { renderTasks, updateCounts, applyFilterStyles } from './view.js';
import { uid } from './utils.js';

let tasks = loadTasks();
let search = '';
let filter = 'all';

const els = {
  form: document.getElementById('taskForm'),
  input: document.getElementById('taskInput'),
  due: document.getElementById('dueDate'),
  list: document.getElementById('taskList'),
  search: document.getElementById('search'),
  counts: document.getElementById('counts'),
  filterGroup: document.getElementById('filterGroup'),
  clearCompleted: document.getElementById('clearCompleted')
};

function render() {
  renderTasks(els.list, tasks, filter, search);
  updateCounts(els.counts, tasks);
  applyFilterStyles(els.filterGroup, filter);
  els.clearCompleted.disabled = !tasks.some(t => t.done);
}

function addTask(title, dateDue) {
  const t = dateDue
    ? new TimedTask(uid(), title, false, dateDue)
    : new Task(uid(), title, false);
  tasks.push(t);
  saveTasks(tasks);
  render();
}

function toggleTaskById(id) {
  const t = tasks.find(x => x.id === id);
  if (t) {
    t.toggle();
    saveTasks(tasks);
    render();
  }
}
function updateTaskTitle(id, newTitle) {
  const t = tasks.find(x => x.id === id);
  if (t && newTitle.trim()) {
    t.setTitle(newTitle);
    saveTasks(tasks);
    render();
  }
}

function deleteTaskById(id) {
  tasks = tasks.filter(x => x.id !== id);
  saveTasks(tasks);
  render();
}

function clearCompleted() {
  tasks = tasks.filter(x => !x.done);
  saveTasks(tasks);
  render();
}

// Initial render on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  render();
  els.input.focus();
});

// Add task
els.form.addEventListener('submit', (e) => {
  e.preventDefault();
  const dateDue = els.due.value;
  const title = els.input.value.trim();
  if (!title) return;
  addTask(title, dateDue);
  els.form.reset();
  els.input.focus();
});

// Delegated events on list
els.list.addEventListener('change', (e) => {
  const li = e.target.closest('li.task');
  if (!li) return;
  if (e.target.matches('input[type="checkbox"]')) {
    toggleTaskById(li.dataset.id);
  }
});

els.list.addEventListener('click', (e) => {
  const li = e.target.closest('li.task');
  if (!li) return;
  if (e.target.matches('button.delete')) {
    deleteTaskById(li.dataset.id);
  }
});

// editing task with a doubleclick
els.list.addEventListener('dblclick', (e) => {
  const span = e.target.closest('span.title');
  if (!span) return;
  const li = span.closest('li.task');
  const id = li.dataset.id;

  const input = document.createElement('input');
  input.type = 'text';
  input.value = span.textContent;
  input.className = 'edit';

  input.addEventListener('blur', () => updateTaskTitle(id, input.value));
  input.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') input.blur();
    if (ev.key === 'Escape') render();
  });

  span.replaceWith(input);
  input.focus();
});
  
  //searching tasks
els.search.addEventListener('input', (e) => {
  search = e.target.value;
  render();
});

// Filters
els.filterGroup.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-filter]');
  if (!btn) return;
  filter = btn.dataset.filter;
  render();
});

// Clear completed
els.clearCompleted.addEventListener('click', clearCompleted);
