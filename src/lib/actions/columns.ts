'use server'

import { db } from '@/lib/data/db'
import { columns, tasks, users } from '@/lib/data/schema'
import { eq, asc } from 'drizzle-orm'
import { ColumnWithTasks } from '@/types/column'
import { Task } from '@/types/task'

export async function getColumnsWithTasks(): Promise<ColumnWithTasks[]> {
  try {
    const columnsData = await db
      .select()
      .from(columns)
      .orderBy(asc(columns.order))

    const columnsWithTasks = await Promise.all(
      columnsData.map(async (column) => {
        const tasksData = await db
          .select({
            id: tasks.id,
            title: tasks.title,
            description: tasks.description,
            column_id: tasks.column_id,
            assignee_id: tasks.assignee_id,
            order: tasks.order,
            created_at: tasks.created_at,
            assignee: {
              id: users.id,
              name: users.name,
              avatar: users.avatar,
            },
          })
          .from(tasks)
          .leftJoin(users, eq(tasks.assignee_id, users.id))
          .where(eq(tasks.column_id, column.id))
          .orderBy(asc(tasks.order))

        const tasksWithAssignee: Task[] = tasksData.map((task) => ({
          id: task.id,
          title: task.title,
          description: task.description || undefined,
          status: column.id as 'todo' | 'in-progress' | 'done',
          assignee: task.assignee_id && task.assignee ? {
            id: task.assignee.id,
            name: task.assignee.name,
            avatar: task.assignee.avatar || undefined,
          } : undefined,
        }))

        return {
          id: column.id,
          title: column.title,
          order: column.order,
          created_at: column.created_at,
          tasks: tasksWithAssignee,
        }
      })
    )

    return columnsWithTasks
  } catch (error) {
    console.error('Error fetching columns with tasks:', error)
    throw new Error('Failed to fetch columns with tasks')
  }
}

export async function getColumns() {
  try {
    return await db
      .select()
      .from(columns)
      .orderBy(asc(columns.order))
  } catch (error) {
    console.error('Error fetching columns:', error)
    throw new Error('Failed to fetch columns')
  }
} 