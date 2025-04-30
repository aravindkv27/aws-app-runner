import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash2, Calendar, Clock } from "lucide-react";
import { Todo } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number, completed: boolean) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  const { id, title, description, dueDate, completed, createdAt } = todo;

  return (
    <Card className="hover:shadow-md transition-all">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox 
            className="mt-1 h-5 w-5 rounded border-gray-300 cursor-pointer"
            checked={completed}
            onCheckedChange={(checked) => onToggle(id, checked as boolean)}
          />
          <div className="flex-1">
            <h3 className={cn(
              "text-lg font-medium",
              completed && "line-through text-gray-400"
            )}>
              {title}
            </h3>
            {description && (
              <p className={cn(
                "text-gray-500 dark:text-gray-400 text-sm mt-1",
                completed && "line-through text-gray-400"
              )}>
                {description}
              </p>
            )}
            <div className="flex items-center gap-4 mt-2">
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar className="h-3 w-3" /> Added: {formatDate(createdAt)}
              </span>
              {dueDate && (
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Due: {formatDate(dueDate)}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              className="text-gray-500 hover:text-sky-500 p-1 transition-colors"
              onClick={() => onEdit(todo)}
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button 
              className="text-gray-500 hover:text-red-500 p-1 transition-colors"
              onClick={() => onDelete(id)}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
