import { TaskCard } from "./task-card"
import { Task, User } from "@/types/task"

interface KanbanColumnProps {
  id: string
  title: string
  tasks: Task[]
  className?: string
  onAssigneeChange?: (taskId: string, assignee: User | null) => void
  users: User[]
}

export function KanbanColumn({ title, tasks, className, onAssigneeChange, users }: KanbanColumnProps) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-sm text-muted-foreground">{tasks.length}</span>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onAssigneeChange={onAssigneeChange} users={users} />
        ))}
      </div>
    </div>
  )
} 