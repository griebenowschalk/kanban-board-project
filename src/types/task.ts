export type TaskStatus = "todo" | "in-progress" | "done"

export interface User {
  id: string
  name: string
  avatar?: string
}

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  assignee?: User
} 