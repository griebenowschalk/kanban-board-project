import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Task, User } from "@/types/task"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { users } from "@/lib/data/users"
import { AssigneeSelect } from "@/components/features/kanban/assignee-select"

interface TaskCardProps {
  task: Task
  className?: string
  onAssigneeChange?: (taskId: string, assignee: User | null) => void
  onEdit?: (task: Task) => void
}

export function TaskCard({ task, className, onAssigneeChange, onEdit }: TaskCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">{task.title}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white dark:bg-zinc-950 z-50 border shadow-md">
            <DropdownMenuItem onClick={() => onEdit?.(task)}>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      {task.description && (
        <CardContent>
          <p className="text-sm text-muted-foreground">{task.description}</p>
        </CardContent>
      )}
      <CardFooter className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <AssigneeSelect
            value={task.assignee?.id ?? "unassigned"}
            onChange={val => {
              const user = users.find(u => u.id === val) || null
              onAssigneeChange?.(task.id, val === "unassigned" ? null : user)
            }}
          />
        </div>
      </CardFooter>
    </Card>
  )
} 