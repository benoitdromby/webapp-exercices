import { useTasks } from '../../hooks/useTasks'
import KanbanBoard from '../../components/Tasks/KanbanBoard'
import GlobalLoader from '../../components/Loaders/GlobalLoader'
import ErrorMessage from '../../components/Error/ErrorMessage'

function Tasks() {
  const { columns, isLoading, isError, moveTask } = useTasks()

  if (isError) {
    return <ErrorMessage message='An error occurred' />
  }

  return (
    <div>
      <GlobalLoader isLoading={isLoading} />
      <KanbanBoard columns={columns} moveTask={moveTask} />
    </div>
  )
}

export default Tasks
