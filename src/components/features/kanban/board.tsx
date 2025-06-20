import { getColumnsWithTasks } from '@/lib/actions/columns'
import { KanbanColumn } from "./kanban-column"

interface BoardProps {
  className?: string
}

export async function Board({ className }: BoardProps) {
  const columns = await getColumnsWithTasks()

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 relative ${className || ''}`}>
      {columns.map((column) => (
        <KanbanColumn
          key={column.id}
          id={column.id}
          title={column.title}
          tasks={column.tasks}
        />
      ))}
    </div>
  )
} 