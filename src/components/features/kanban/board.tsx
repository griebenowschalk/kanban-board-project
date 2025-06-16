"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { KanbanColumn } from "./kanban-column"
import { Task, User } from "@/types/task"

const users: User[] = [
  { id: "1", name: "John Doe", avatar: "https://github.com/shadcn.png" },
  { id: "2", name: "Jane Smith", avatar: "https://github.com/shadcn.png" },
  { id: "3", name: "Bob Johnson", avatar: "https://github.com/shadcn.png" },
]

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

  const columns = [
    { id: "todo", title: "Todo" },
    { id: "in-progress", title: "In Progress" },
    { id: "done", title: "Done" },
  ]

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4", className)}>
      {columns.map((column) => (
        <KanbanColumn
          key={column.id}
          id={column.id}
          title={column.title}
          tasks={tasks.filter((task) => task.status === column.id)}
          onAssigneeChange={handleAssigneeChange}
          users={users}
        />
      ))}
    </div>
  )
} 