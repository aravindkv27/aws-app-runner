import { useState } from "react";
import { Header } from "@/components/Header";
import { TodoStats } from "@/components/TodoStats";
import { TodoFiltersComponent } from "@/components/TodoFilters";
import { TodoList } from "@/components/TodoList";
import { TodoModal } from "@/components/TodoModal";
import { DeleteConfirmationModal } from "@/components/DeleteConfirmationModal";
import { useTodos } from "@/hooks/useTodos";
import { Todo, TodoFilters, TodoFormValues } from "@/lib/types";

export default function Home() {
  // State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [deletingTodoId, setDeletingTodoId] = useState<number | null>(null);
  const [filters, setFilters] = useState<TodoFilters>({
    status: 'all',
    search: '',
    sort: 'newest',
  });

  // Hooks
  const { 
    todos, 
    isLoading, 
    createTodo, 
    updateTodo, 
    toggleTodoStatus, 
    deleteTodo 
  } = useTodos();

  // Handlers
  const handleAddTodo = () => {
    setEditingTodo(null);
    setIsModalOpen(true);
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const handleDeleteTodo = (id: number) => {
    setDeletingTodoId(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTodo(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingTodoId(null);
  };

  const handleConfirmDelete = () => {
    if (deletingTodoId !== null) {
      deleteTodo(deletingTodoId);
      handleCloseDeleteModal();
    }
  };

  const handleToggleStatus = (id: number, completed: boolean) => {
    toggleTodoStatus({ id, completed });
  };

  const handleFormSubmit = (values: TodoFormValues) => {
    if (editingTodo) {
      updateTodo({
        id: editingTodo.id,
        todo: {
          title: values.title,
          description: values.description || null,
          dueDate: values.dueDate || null,
          completed: values.completed,
        }
      });
    } else {
      createTodo({
        title: values.title,
        description: values.description || undefined,
        dueDate: values.dueDate || undefined,
        completed: values.completed,
      });
    }
  };

  const handleFilterChange = (key: keyof TodoFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <TodoStats todos={todos} onAddTodo={handleAddTodo} />
        
        <TodoFiltersComponent 
          filters={filters} 
          onFilterChange={handleFilterChange} 
        />
        
        <TodoList 
          todos={todos}
          filters={filters}
          isLoading={isLoading}
          onToggle={handleToggleStatus}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
          onAddTodo={handleAddTodo}
        />
      </main>
      
      <TodoModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        editTodo={editingTodo}
      />
      
      <DeleteConfirmationModal 
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
