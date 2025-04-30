import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Todo } from "@/lib/types";

interface TodoStatsProps {
  todos: Todo[];
  onAddTodo: () => void;
}

export function TodoStats({ todos, onAddTodo }: TodoStatsProps) {
  const totalCount = todos.length;
  const completedCount = todos.filter(todo => todo.completed).length;
  
  return (
    <div className="mb-6">
      <Card>
        <CardContent className="p-4 flex justify-between items-center">
          <div className="flex gap-4">
            <div className="text-center">
              <span className="block text-2xl font-bold text-sky-500">{totalCount}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Total</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-green-500">{completedCount}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Completed</span>
            </div>
          </div>
          <Button 
            className="bg-sky-500 hover:bg-sky-600 text-white flex items-center gap-2"
            onClick={onAddTodo}
          >
            <Plus className="h-4 w-4" />
            <span>New Task</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
