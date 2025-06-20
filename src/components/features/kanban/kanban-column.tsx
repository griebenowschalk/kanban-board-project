"use client"

import { TaskCard } from "./task-card";
import { Task, User } from "@/types/task";
import { useState } from "react";
import { TaskDialog } from "@/components/features/kanban/task-dialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createTask } from "@/lib/actions/tasks";
import { useTransition } from "react";

interface KanbanColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  className?: string;
}

export function KanbanColumn({
  id,
  title,
  tasks,
  className,
}: KanbanColumnProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleCreateTask = (values: { title: string; description?: string; assignee?: User | null }) => {
    startTransition(async () => {
      await createTask(id, {
        title: values.title,
        description: values.description,
        assigneeId: values.assignee?.id || null,
      });
      setDialogOpen(false);
    });
  };
  console.log(dialogOpen);
  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">{title}</h3>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => setDialogOpen(true)}
          disabled={isPending}
        >
          <Plus className="h-4 w-4" />
          New Task
        </Button>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
          />
        ))}
      </div>
      <TaskDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
        }}
        onSubmit={handleCreateTask}
        initialValues={undefined}
      />
    </div>
  );
}
