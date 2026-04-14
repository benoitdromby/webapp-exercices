import { useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { Task, TaskStatus } from '../../types/taskTypes'
import KanbanColumn from './KanbanColumn'

const COLUMN_ORDER: TaskStatus[] = ['todo', 'in_progress', 'done']

function findTaskColumn(taskId: string, columns: Record<TaskStatus, Task[]>): TaskStatus | undefined {
  return COLUMN_ORDER.find(status => columns[status].some(t => t.id === taskId))
}

function KanbanBoard({
  columns,
  moveTask,
}: {
  columns: Record<TaskStatus, Task[]>
  moveTask: (taskId: string, fromStatus: TaskStatus, toStatus: TaskStatus, toIndex: number) => void
}) {
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  // Require 8px of movement before a drag starts — prevents accidental drags on click
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  )

  function handleDragStart({ active }: DragStartEvent) {
    const fromStatus = findTaskColumn(active.id as string, columns)
    if (!fromStatus) return
    const task = columns[fromStatus].find(t => t.id === active.id) ?? null
    setActiveTask(task)
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveTask(null)
    if (!over || active.id === over.id) return

    const taskId = active.id as string
    const overId = over.id as string

    const fromStatus = findTaskColumn(taskId, columns)
    if (!fromStatus) return

    const isColumnDrop = (COLUMN_ORDER as string[]).includes(overId)

    // Determine destination column
    const toStatus: TaskStatus = isColumnDrop
      ? (overId as TaskStatus)
      : (findTaskColumn(overId, columns) ?? fromStatus)

    // Determine destination index
    let toIndex: number

    if (isColumnDrop) {
      // Dropped on an empty column area → append at end
      toIndex = columns[toStatus].length
    } else {
      // Dropped on a task → insert at that task's current index
      toIndex = columns[toStatus].findIndex(t => t.id === overId)
      if (toIndex === -1) toIndex = columns[toStatus].length
    }

    // Skip if nothing actually changed (same column, same position)
    if (fromStatus === toStatus) {
      const fromIndex = columns[fromStatus].findIndex(t => t.id === taskId)
      if (fromIndex === toIndex) return
    }

    moveTask(taskId, fromStatus, toStatus, toIndex)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div style={{ display: 'flex', gap: '16px', padding: '24px' }}>
        {COLUMN_ORDER.map(status => (
          <KanbanColumn key={status} status={status} tasks={columns[status]} />
        ))}
      </div>

      {/* Plain div overlay — avoids registering a duplicate useSortable ID */}
      <DragOverlay>
        {activeTask ? (
          <div style={{
            padding: '8px 12px',
            background: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            cursor: 'grabbing',
          }}>
            {activeTask.title}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export default KanbanBoard
