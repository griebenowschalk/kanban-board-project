"use client"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Task } from "@/types/task"
import { AssigneeSelect } from "@/components/features/kanban/assignee-select"
import { updateTaskAssignee } from "@/lib/actions/tasks"
import { useTransition } from "react"

interface TaskCardProps {
  task: Task
  className?: string
}

export function TaskCard({ task, className }: TaskCardProps) {
  const [isPending, startTransition] = useTransition()

  const handleAssigneeChange = (value: string) => {
    startTransition(async () => {
      const assigneeId = value === "unassigned" ? null : value
      await updateTaskAssignee(task.id, assigneeId)
    })
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">{task.title}</CardTitle>
      </CardHeader>
      {task.description && (
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
        </CardContent>
      )}
      <CardFooter className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <AssigneeSelect
            value={task.assignee?.id ?? "unassigned"}
            onChange={handleAssigneeChange}
            disabled={isPending}
          />
        </div>
      </CardFooter>
    </Card>
  )
} 