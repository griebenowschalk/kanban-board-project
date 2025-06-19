import { TaskCard } from "./task-card";
import { Task, User } from "@/types/task";
import { useState } from "react";
import { TaskDialog } from "@/components/features/kanban/task-dialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface KanbanColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  className?: string;
  onAssigneeChange?: (taskId: string, assignee: User | null) => void;
  onCreateTask: (
    columnId: string,
    values: { title: string; description?: string; assignee?: User | null }
  ) => void;
  onEditTask?: (taskId: string, values: { title: string; description?: string; assignee?: User | null }) => void;
}

export function KanbanColumn({
  id,
  title,
  tasks,
  className,
  onAssigneeChange,
  onCreateTask,
  onEditTask,
}: KanbanColumnProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleCreate = (values: { title: string; description?: string; assignee?: User | null }) => {
    onCreateTask(id, values);
    setDialogOpen(false);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleEditSubmit = (values: { title: string; description?: string; assignee?: User | null }) => {
    if (editingTask && onEditTask) {
      onEditTask(editingTask.id, values);
    }
    setDialogOpen(false);
    setEditingTask(null);
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">{title}</h3>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => {
            setDialogOpen(true);
            setEditingTask(null);
          }}
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
            onAssigneeChange={onAssigneeChange}
            onEdit={handleEdit}
          />
        ))}
      </div>
      <TaskDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            setEditingTask(null);
          }
        }}
        onSubmit={editingTask ? handleEditSubmit : handleCreate}
        initialValues={editingTask || undefined}
      />
    </div>
  );
}
