import { User } from "@/types/task";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AssigneeSelectProps {
  users: User[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export function AssigneeSelect({
  users,
  value,
  onChange,
  className,
  disabled,
}: AssigneeSelectProps) {
  const assigneeUser = users.find((u) => u.id === value) || null;
  return (
    <Select
      value={value || "unassigned"}
      onValueChange={onChange}
      disabled={disabled}
    >
      <SelectTrigger
        className={`min-w-[8rem] w-auto flex-grow h-8 px-2 ${className || ""}`}
      >
        {assigneeUser ? (
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={assigneeUser.avatar} alt={assigneeUser.name} />
              <AvatarFallback>{assigneeUser.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{assigneeUser.name}</span>
          </div>
        ) : (
          <span className="text-muted-foreground text-sm">Unassigned</span>
        )}
      </SelectTrigger>
      <SelectContent className="bg-white dark:bg-zinc-950 border shadow-md min-w-[160px] z-50 !bg-opacity-100">
        <SelectItem value="unassigned">Unassigned</SelectItem>
        {users.map((user) => (
          <SelectItem
            key={user.id}
            value={user.id}
            className="flex items-center gap-2"
          >
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
  );
}
