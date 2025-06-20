import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { users, tasks, columns } from "@/lib/data/schema";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString, max: 20 });

export const db = drizzle(pool, {
  schema: {
    tasks,
    users,
    columns,
  },
});
