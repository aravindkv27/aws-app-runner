import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return '';
  
  try {
    // Try to parse ISO date format
    const date = parseISO(dateString);
    return format(date, 'MMM d, yyyy');
  } catch (error) {
    // If it's already formatted, just return it
    return dateString;
  }
}

export function formatISODate(dateString: string | null | undefined): string {
  if (!dateString) return '';
  
  try {
    // Try to parse date for form input (yyyy-MM-dd)
    const date = parseISO(dateString);
    return format(date, 'yyyy-MM-dd');
  } catch (error) {
    return '';
  }
}

export function getFilteredTodos<T extends { title: string; description?: string | null; completed: boolean; createdAt: string }>(
  todos: T[],
  filters: { status: 'all' | 'active' | 'completed'; search: string; sort: 'newest' | 'oldest' | 'alphabetical' }
): T[] {
  let filteredTodos = [...todos];
  
  // Status filter
  if (filters.status !== 'all') {
    const isCompleted = filters.status === 'completed';
    filteredTodos = filteredTodos.filter(todo => todo.completed === isCompleted);
  }
  
  // Search filter
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredTodos = filteredTodos.filter(todo => 
      todo.title.toLowerCase().includes(searchTerm) || 
      (todo.description && todo.description.toLowerCase().includes(searchTerm))
    );
  }
  
  // Sort
  switch(filters.sort) {
    case 'newest':
      filteredTodos.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      break;
    case 'oldest':
      filteredTodos.sort((a, b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });
      break;
    case 'alphabetical':
      filteredTodos.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }
  
  return filteredTodos;
}
