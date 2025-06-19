"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { KanbanColumn } from "./kanban-column"
import { Task, TaskStatus, User } from "@/types/task"
import { users } from "@/lib/data/users"

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Design new dashboard",
    description: "Create wireframes and mockups for the new dashboard",
    status: "todo",
    assignee: users[0],
  },
  {
    id: "2",
    title: "Implement authentication",
    description: "Set up NextAuth.js with Google provider",
    status: "in-progress",
    assignee: users[1],
  },
  {
    id: "3",
    title: "Setup project structure",
    description: "Initialize Next.js project with TypeScript",
    status: "done",
  },
]

interface BoardProps {
  className?: string
}

export function Board({ className }: BoardProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  const handleAssigneeChange = (taskId: string, assignee: User | null) => {
    setTasks(tasks =>
      tasks.map(task =>
        task.id === taskId ? { ...task, assignee: assignee || undefined } : task
      )
    )
  }

  const handleCreateTask = (
    columnId: string,
    values: { title: string; description?: string; assignee?: User | null }
  ) => {
    setTasks(tasks => [
      ...tasks,
      {
        id: (tasks.length + 1).toString(),
        title: values.title,
        description: values.description,
        status: columnId as TaskStatus,
        assignee: values.assignee || undefined,
      },
    ])
  }

  const columns = [
    { id: "todo", title: "Todo" },
    { id: "in-progress", title: "In Progress" },
    { id: "done", title: "Done" },
  ]

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 relative", className)}>
      {columns.map((column) => (
        <KanbanColumn
          key={column.id}
          id={column.id}
          title={column.title}
          tasks={tasks.filter((task) => task.status === column.id)}
          onAssigneeChange={handleAssigneeChange}
          onCreateTask={handleCreateTask}
        />
      ))}
    </div>
  )
} 