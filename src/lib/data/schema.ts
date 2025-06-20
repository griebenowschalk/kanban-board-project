import { pgTable, varchar, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  avatar: varchar('avatar', { length: 512 }),
  created_at: timestamp('created_at').notNull().defaultNow(),
});

export const columns = pgTable('columns', {
  id: varchar('id', { length: 32 }).primaryKey(), // e.g. 'todo', 'in-progress', 'done'
  title: varchar('title', { length: 255 }).notNull(),
  order: integer('order').notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
});

export const tasks = pgTable('tasks', {
  id: varchar('id', { length: 36 }).primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  column_id: varchar('column_id', { length: 32 }).references(() => columns.id),
  assignee_id: varchar('assignee_id', { length: 36 }).references(() => users.id),
  order: integer('order').notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
}); 