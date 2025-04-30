export interface Todo {
  id: number;
  title: string;
  description: string | null;
  dueDate: string | null;
  completed: boolean;
  createdAt: string;
}

export interface CreateTodoInput {
  title: string;
  description?: string;
  dueDate?: string;
  completed?: boolean;
}

export interface UpdateTodoInput {
  title?: string;
  description?: string;
  dueDate?: string;
  completed?: boolean;
}

export interface TodoFormValues {
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

export type TodoFilters = {
  status: 'all' | 'active' | 'completed';
  search: string;
  sort: 'newest' | 'oldest' | 'alphabetical';
};

export type ToastType = 'success' | 'error' | 'info';
