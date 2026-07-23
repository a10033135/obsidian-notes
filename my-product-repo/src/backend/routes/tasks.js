'use strict';

// Implements docs/03-Engineering/API Spec.md — keep both in sync.

const db = require('../db');

const TASK_ID_PATTERN = /^\/api\/tasks\/([^/]+)$/;

function sendJSON(res, statusCode, data) {
  const body = data === undefined ? '' : JSON.stringify(data);
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 1e6) {
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => resolve(raw));
    req.on('error', reject);
  });
}

async function parseJSONBody(req) {
  const raw = await readBody(req);
  if (!raw) return {};
  return JSON.parse(raw);
}

async function handleTasksRoute(req, res, pathname, method) {
  if (pathname === '/api/tasks' && method === 'GET') {
    sendJSON(res, 200, db.list());
    return true;
  }

  if (pathname === '/api/tasks' && method === 'POST') {
    let body;
    try {
      body = await parseJSONBody(req);
    } catch {
      sendJSON(res, 400, { error: 'Invalid JSON body' });
      return true;
    }
    const title = typeof body.title === 'string' ? body.title.trim() : '';
    if (!title) {
      sendJSON(res, 400, { error: 'title is required' });
      return true;
    }
    if (title.length > 200) {
      sendJSON(res, 400, { error: 'title must be at most 200 characters' });
      return true;
    }
    sendJSON(res, 201, db.create(title));
    return true;
  }

  const match = pathname.match(TASK_ID_PATTERN);

  if (match && method === 'PATCH') {
    let body;
    try {
      body = await parseJSONBody(req);
    } catch {
      sendJSON(res, 400, { error: 'Invalid JSON body' });
      return true;
    }
    if (body.status !== 'todo' && body.status !== 'done') {
      sendJSON(res, 400, { error: 'status must be "todo" or "done"' });
      return true;
    }
    const updated = db.updateStatus(match[1], body.status);
    if (!updated) {
      sendJSON(res, 404, { error: 'task not found' });
      return true;
    }
    sendJSON(res, 200, updated);
    return true;
  }

  if (match && method === 'DELETE') {
    const removed = db.remove(match[1]);
    if (!removed) {
      sendJSON(res, 404, { error: 'task not found' });
      return true;
    }
    res.writeHead(204);
    res.end();
    return true;
  }

  return false;
}

module.exports = { handleTasksRoute };
