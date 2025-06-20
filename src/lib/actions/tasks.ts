'use server'

import { db } from '@/lib/data/db'
import { tasks } from '@/lib/data/schema'
import { eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'

export async function updateTaskAssignee(taskId: string, assigneeId: string | null) {
  try {
    await db
      .update(tasks)
      .set({ assignee_id: assigneeId })
      .where(eq(tasks.id, taskId))
    
    return { success: true }
  } catch (error) {
    console.error('Error updating task assignee:', error)
    throw new Error('Failed to update task assignee')
  }
}

export async function createTask(columnId: string, values: { 
  title: string; 
  description?: string; 
  assigneeId?: string | null 
}) {
  try {
    // Get the highest order in the column to place new task at the end
    const existingTasks = await db
      .select({ order: tasks.order })
      .from(tasks)
      .where(eq(tasks.column_id, columnId))
      .orderBy(tasks.order)
    
    const nextOrder = existingTasks.length > 0 ? Math.max(...existingTasks.map(t => t.order)) + 1 : 0

    const newTask = await db
      .insert(tasks)
      .values({
        id: nanoid(),
        title: values.title,
        description: values.description,
        column_id: columnId,
        assignee_id: values.assigneeId,
        order: nextOrder,
      })
      .returning()

    return { success: true, task: newTask[0] }
  } catch (error) {
    console.error('Error creating task:', error)
    throw new Error('Failed to create task')
  }
} 