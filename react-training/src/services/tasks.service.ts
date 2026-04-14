import { API_URL } from '../constants/constants'
import { TaskStatus } from '../types/taskTypes'

export async function fetchTasks({ signal }: { signal?: AbortSignal } = {}) {
  return fetch(`${API_URL}/tasks`, { signal })
    .then(r => r.json())
    .then((tasks: { _id: string; [key: string]: unknown }[]) =>
      tasks.map(t => ({ ...t, id: t._id }))
    )
}

export async function updateTask(id: string, data: { status: TaskStatus; order: number }) {
  return fetch(`${API_URL}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(r => r.json())
}
