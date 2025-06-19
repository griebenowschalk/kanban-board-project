"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { User, Task } from "@/types/task"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { AssigneeSelect } from "@/components/features/kanban/assignee-select"
import { users } from "@/lib/data/users"

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  assignee: z.string().optional(),
})

type TaskFormValues = z.infer<typeof taskSchema>

interface TaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (values: { title: string; description?: string; assignee?: User | null }) => void
  initialValues?: Partial<Task>
  trigger?: React.ReactNode
}

export function TaskDialog({ open, onOpenChange, onSubmit, initialValues, trigger }: TaskDialogProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    watch,
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: initialValues?.title || "",
      description: initialValues?.description || "",
      assignee: initialValues?.assignee?.id || "",
    },
  })

  useEffect(() => {
    reset({
      title: initialValues?.title || "",
      description: initialValues?.description || "",
      assignee: initialValues?.assignee?.id || "",
    })
  }, [initialValues, open, reset])

  const assigneeId = watch("assignee")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="bg-white dark:bg-zinc-950 !bg-opacity-100 border shadow-lg z-50">
        <DialogHeader>
          <DialogTitle>{initialValues ? "Edit Task" : "Create Task"}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(values => {
            onSubmit({
              title: values.title,
              description: values.description,
              assignee: users.find(u => u.id === values.assignee) || null,
            })
          })}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title")} />
            {errors.title && <p className="text-xs text-destructive mt-1">{errors.title.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register("description")} rows={3} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="assignee">Assignee</Label>
            <AssigneeSelect
              value={assigneeId}
              onChange={val => setValue("assignee", val === "unassigned" ? "" : val)}
            />
          </div>
          <DialogFooter>
            <Button type="submit">{initialValues ? "Save" : "Create"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 