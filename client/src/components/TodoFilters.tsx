import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { TodoFilters } from "@/lib/types";

interface TodoFiltersProps {
  filters: TodoFilters;
  onFilterChange: (key: keyof TodoFilters, value: string) => void;
}

export function TodoFiltersComponent({ filters, onFilterChange }: TodoFiltersProps) {
  return (
    <div className="mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input 
                type="text" 
                placeholder="Search tasks..." 
                className="pl-10 w-full"
                value={filters.search}
                onChange={(e) => onFilterChange('search', e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select 
                value={filters.status} 
                onValueChange={(value) => onFilterChange('status', value as TodoFilters['status'])}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              
              <Select 
                value={filters.sort} 
                onValueChange={(value) => onFilterChange('sort', value as TodoFilters['sort'])}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="alphabetical">A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
