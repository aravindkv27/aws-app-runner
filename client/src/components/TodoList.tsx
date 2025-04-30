import { TodoItem } from "./TodoItem";
import { Todo, TodoFilters } from "@/lib/types";
import { getFilteredTodos } from "@/lib/utils";
import { ClipboardList, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TodoListProps {
  todos: Todo[];
  filters: TodoFilters;
  isLoading: boolean;
  onToggle: (id: number, completed: boolean) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;
  onAddTodo: () => void;
}

export function TodoList({ 
  todos, 
  filters, 
  isLoading, 
  onToggle, 
  onEdit, 
  onDelete, 
  onAddTodo 
}: TodoListProps) {
  const filteredTodos = getFilteredTodos(todos, filters);
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 animate-pulse">
            <div className="flex items-start gap-3">
              <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded-sm mt-1"></div>
              <div className="flex-1">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                <div className="flex items-center gap-4 mt-2">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (todos.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
        <div className="flex flex-col items-center">
          <ClipboardList className="h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-medium mb-2">No tasks yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Get started by adding your first task!</p>
          <Button
            className="bg-sky-500 hover:bg-sky-600 text-white flex items-center gap-2"
            onClick={onAddTodo}
          >
            <span>Add New Task</span>
          </Button>
        </div>
      </div>
    );
  }
  
  if (filteredTodos.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
        <div className="flex flex-col items-center">
          <Search className="h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-medium mb-2">No matching tasks</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Try changing your search or filter criteria</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
