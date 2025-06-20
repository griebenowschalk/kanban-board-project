import { Task } from './task'

export interface Column {
  id: string
  title: string
  order: number
  created_at: Date
}

export interface ColumnWithTasks extends Column {
  tasks: Task[]
} 