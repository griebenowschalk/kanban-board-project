import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Task, User } from "@/types/task"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TaskCardProps {
  task: Task
  className?: string
  onAssigneeChange?: (taskId: string, assignee: User | null) => void
  users: User[]
  onEdit?: (task: Task) => void
}

export function TaskCard({ task, className, onAssigneeChange, users, onEdit }: TaskCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">{task.title}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white dark:bg-zinc-950 z-50 border shadow-md">
            <DropdownMenuItem onClick={() => onEdit?.(task)}>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      {task.description && (
        <CardContent>
          <p className="text-sm text-muted-foreground">{task.description}</p>
        </CardContent>
      )}
      <CardFooter className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <Select
            value={task.assignee?.id ?? "unassigned"}
            onValueChange={val => {
              const user = users.find(u => u.id === val) || null
              onAssigneeChange?.(task.id, val === "unassigned" ? null : user)
            }}
          >
            <SelectTrigger className="min-w-[8rem] w-auto flex-grow h-8 px-2">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={task.assignee?.avatar} alt={task.assignee?.name} />
                <AvatarFallback>{task.assignee?.name?.slice(0, 2) ?? "?"}</AvatarFallback>
              </Avatar>
              <SelectValue placeholder="Unassigned">
                {task.assignee ? task.assignee.name : "Unassigned"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent
              className="bg-white dark:bg-zinc-950 border shadow-md min-w-[160px] z-50 !bg-opacity-100"
            >
              <SelectItem value="unassigned">Unassigned</SelectItem>
              {users.map(user => (
                <SelectItem key={user.id} value={user.id} className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{user.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardFooter>
    </Card>
  )
} 