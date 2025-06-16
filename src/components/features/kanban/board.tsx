"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Task {
  id: string
  title: string
  description?: string
  status: "todo" | "in-progress" | "done"
}

interface BoardProps {
  tasks?: Task[]
  className?: string
}

export function Board({ tasks = [], className }: BoardProps) {
  const columns = [
    { id: "todo", title: "Todo" },
    { id: "in-progress", title: "In Progress" },
    { id: "done", title: "Done" },
  ]

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4", className)}>
      {columns.map((column) => (
        <div key={column.id} className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{column.title}</h3>
            <span className="text-sm text-muted-foreground">
              {tasks.filter((task) => task.status === column.id).length}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {tasks
              .filter((task) => task.status === column.id)
              .map((task) => (
                <Card key={task.id} className="p-4">
                  <h4 className="font-medium">{task.title}</h4>
                  {task.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {task.description}
                    </p>
                  )}
                </Card>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
} 