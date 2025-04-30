import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { Todo, CreateTodoInput, UpdateTodoInput } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export function useTodos() {
  const { toast } = useToast();

  const todosQuery = useQuery<Todo[]>({
    queryKey: ['/api/todos'],
  });

  const createTodoMutation = useMutation({
    mutationFn: async (newTodo: CreateTodoInput) => {
      const res = await apiRequest('POST', '/api/todos', newTodo);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/todos'] });
      toast({
        title: "Task Added",
        description: "The new task has been successfully added",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to add task: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: async ({ id, todo }: { id: number; todo: UpdateTodoInput }) => {
      const res = await apiRequest('PATCH', `/api/todos/${id}`, todo);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/todos'] });
      toast({
        title: "Task Updated",
        description: "The task has been successfully updated",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update task: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const toggleTodoStatusMutation = useMutation({
    mutationFn: async ({ id, completed }: { id: number; completed: boolean }) => {
      const res = await apiRequest('PATCH', `/api/todos/${id}`, { completed });
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/todos'] });
      toast({
        title: "Status Updated",
        description: `Task marked as ${data.completed ? 'completed' : 'active'}`,
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update task status: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest('DELETE', `/api/todos/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/todos'] });
      toast({
        title: "Task Deleted",
        description: "The task has been successfully deleted",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete task: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    todos: todosQuery.data || [],
    isLoading: todosQuery.isLoading,
    isError: todosQuery.isError,
    error: todosQuery.error,
    createTodo: createTodoMutation.mutate,
    isPendingCreate: createTodoMutation.isPending,
    updateTodo: updateTodoMutation.mutate,
    isPendingUpdate: updateTodoMutation.isPending,
    toggleTodoStatus: toggleTodoStatusMutation.mutate,
    isPendingToggle: toggleTodoStatusMutation.isPending,
    deleteTodo: deleteTodoMutation.mutate,
    isPendingDelete: deleteTodoMutation.isPending,
  };
}
