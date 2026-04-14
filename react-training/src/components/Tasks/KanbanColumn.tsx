import { memo, useMemo } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Task } from '../../types/taskTypes'
import KanbanCard from './KanbanCard'

const COLUMN_LABELS: Record<string, string> = {
  todo: 'TODO',
  in_progress: 'IN PROGRESS',
  done: 'DONE',
}

const KanbanColumn = memo(function KanbanColumn({
  status,
  tasks,
}: {
  status: string
  tasks: Task[]
}) {
  const { setNodeRef } = useDroppable({ id: status })
  const taskIds = useMemo(() => tasks.map(t => t.id), [tasks])

  return (
    <div
      style={{
        flex: 1,
        minWidth: '200px',
        padding: '12px',
        background: '#f4f5f7',
        borderRadius: '6px',
      }}
    >
      <h3
        style={{
          marginBottom: '12px',
          fontSize: '14px',
          fontWeight: 600,
          textTransform: 'uppercase',
        }}
      >
        {COLUMN_LABELS[status] ?? status}
      </h3>

      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        {/* ref on this div makes the whole column area droppable, even when empty */}
        <div ref={setNodeRef} style={{ minHeight: '50px' }}>
          {tasks.map(task => (
            <KanbanCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  )
})

export default KanbanColumn
