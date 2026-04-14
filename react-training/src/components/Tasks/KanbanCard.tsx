import { memo } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Task } from '../../types/taskTypes'

const cardStyle: React.CSSProperties = {
  padding: '8px 12px',
  marginBottom: '8px',
  background: '#fff',
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
  userSelect: 'none',
}

const KanbanCard = memo(function KanbanCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  })

  return (
    <div
      ref={setNodeRef}
      style={{
        ...cardStyle,
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.35 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      {...attributes}
      {...listeners}
    >
      {task.title}
    </div>
  )
})

export default KanbanCard
