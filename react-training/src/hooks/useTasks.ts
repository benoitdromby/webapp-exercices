import { useCallback, useEffect, useReducer } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { fetchTasks, updateTask } from '../services/tasks.service'
import { Task, TaskStatus } from '../types/taskTypes'
import { computeOrder } from '../utils/fractionalIndex'

// ─── State ────────────────────────────────────────────────────────────────────

type Columns = Record<TaskStatus, Task[]>

const INITIAL_STATE: Columns = { todo: [], in_progress: [], done: [] }

function groupTasks(tasks: Task[]): Columns {
  const groups: Columns = { todo: [], in_progress: [], done: [] }
  tasks.forEach(task => {
    if (task.status in groups) groups[task.status].push(task)
  })
  return groups
}

// ─── Reducer ──────────────────────────────────────────────────────────────────

type Action =
  | { type: 'SET_TASKS'; tasks: Task[] }
  | { type: 'MOVE_TASK'; taskId: string; fromStatus: TaskStatus; toStatus: TaskStatus; toIndex: number; newOrder: number }
  | { type: 'REVERT'; state: Columns }

function reducer(state: Columns, action: Action): Columns {
  switch (action.type) {
    case 'SET_TASKS':
      return groupTasks(action.tasks)

    case 'MOVE_TASK': {
      const { taskId, fromStatus, toStatus, toIndex, newOrder } = action
      const task = state[fromStatus].find(t => t.id === taskId)
      if (!task) return state

      const updatedTask: Task = { ...task, status: toStatus, order: newOrder }

      if (fromStatus === toStatus) {
        const col = state[fromStatus].filter(t => t.id !== taskId)
        col.splice(toIndex, 0, updatedTask)
        return { ...state, [fromStatus]: col }
      }

      const fromCol = state[fromStatus].filter(t => t.id !== taskId)
      const toCol = [...state[toStatus]]
      toCol.splice(toIndex, 0, updatedTask)
      return { ...state, [fromStatus]: fromCol, [toStatus]: toCol }
    }

    case 'REVERT':
      return action.state

    default:
      return state
  }
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useTasks() {
  const [columns, dispatch] = useReducer(reducer, INITIAL_STATE)

  const { data: tasks, isLoading, isError } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: ({ signal }) => fetchTasks({ signal }),
  })

  useEffect(() => {
    if (tasks) dispatch({ type: 'SET_TASKS', tasks })
  }, [tasks])

  const { mutate } = useMutation({
    mutationFn: ({ id, status, order }: { id: string; status: TaskStatus; order: number }) =>
      updateTask(id, { status, order }),
  })

  const moveTask = useCallback(
    (taskId: string, fromStatus: TaskStatus, toStatus: TaskStatus, toIndex: number) => {
      const snapshot = columns

      // Compute new order based on the destination column, excluding the moved task
      const targetTasks = columns[toStatus].filter(t => t.id !== taskId)
      const newOrder = computeOrder(targetTasks, toIndex)

      dispatch({ type: 'MOVE_TASK', taskId, fromStatus, toStatus, toIndex, newOrder })

      mutate(
        { id: taskId, status: toStatus, order: newOrder },
        { onError: () => dispatch({ type: 'REVERT', state: snapshot }) },
      )
    },
    [columns, mutate],
  )

  return { columns, isLoading, isError, moveTask }
}
