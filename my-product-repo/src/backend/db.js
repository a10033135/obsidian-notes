'use strict';

// In-memory store mirroring docs/03-Engineering/Database Schema.md `tasks` table.
// See docs/03-Engineering/Architecture/ADR-001-選擇技術棧.md for why this isn't a real DB yet.

let tasks = [];
let nextId = 1;

function list() {
  return [...tasks].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

function create(title) {
  const now = new Date().toISOString();
  const task = {
    id: String(nextId++),
    title,
    status: 'todo',
    created_at: now,
    updated_at: now,
  };
  tasks.push(task);
  return task;
}

function updateStatus(id, status) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return null;
  task.status = status;
  task.updated_at = new Date().toISOString();
  return task;
}

function remove(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

module.exports = { list, create, updateStatus, remove };
