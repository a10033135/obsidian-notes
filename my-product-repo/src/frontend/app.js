// Implements the flow in docs/02-Design/User Flow - 建立待辦事項.md
// against the API in docs/03-Engineering/API Spec.md

const form = document.getElementById('task-form');
const input = document.getElementById('task-title');
const list = document.getElementById('task-list');
const emptyState = document.getElementById('empty-state');
const errorMessage = document.getElementById('error-message');

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.hidden = false;
}

function clearError() {
  errorMessage.hidden = true;
}

function renderTasks(tasks) {
  list.innerHTML = '';
  emptyState.hidden = tasks.length > 0;

  for (const task of tasks) {
    const item = document.createElement('li');
    item.className = 'task-item' + (task.status === 'done' ? ' done' : '');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.status === 'done';
    checkbox.addEventListener('change', () => toggleTask(task, checkbox.checked));

    const title = document.createElement('span');
    title.className = 'title';
    title.textContent = task.title;

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '刪除';
    deleteBtn.addEventListener('click', () => deleteTask(task));

    item.append(checkbox, title, deleteBtn);
    list.appendChild(item);
  }
}

async function loadTasks() {
  const res = await fetch('/api/tasks');
  const tasks = await res.json();
  renderTasks(tasks);
}

async function createTask(title) {
  const res = await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || '建立失敗，請稍後再試');
  }
  return res.json();
}

async function toggleTask(task, checked) {
  const res = await fetch(`/api/tasks/${task.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: checked ? 'done' : 'todo' }),
  });
  if (!res.ok) {
    showError('更新失敗，請稍後再試');
    return;
  }
  await loadTasks();
}

async function deleteTask(task) {
  if (!window.confirm(`確定要刪除「${task.title}」嗎？`)) return;
  const res = await fetch(`/api/tasks/${task.id}`, { method: 'DELETE' });
  if (!res.ok && res.status !== 204) {
    showError('刪除失敗，請稍後再試');
    return;
  }
  await loadTasks();
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  clearError();

  const title = input.value.trim();
  if (!title) {
    showError('標題為必填');
    return;
  }

  try {
    await createTask(title);
    input.value = '';
    await loadTasks();
  } catch (err) {
    showError(err.message);
  }
});

loadTasks();
