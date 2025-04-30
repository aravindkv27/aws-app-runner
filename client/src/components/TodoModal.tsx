import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Todo, TodoFormValues } from "@/lib/types";
import { formatISODate } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";

interface TodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: TodoFormValues) => void;
  editTodo: Todo | null;
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  completed: z.boolean().default(false),
});

export function TodoModal({ isOpen, onClose, onSubmit, editTodo }: TodoModalProps) {
  const form = useForm<TodoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      completed: false,
    },
  });

  // Reset form when editTodo changes
  useEffect(() => {
    if (editTodo) {
      form.reset({
        title: editTodo.title,
        description: editTodo.description || "",
        dueDate: editTodo.dueDate ? formatISODate(editTodo.dueDate) : "",
        completed: editTodo.completed,
      });
    } else {
      form.reset({
        title: "",
        description: "",
        dueDate: "",
        completed: false,
      });
    }
  }, [editTodo, form]);

  function handleSubmit(values: TodoFormValues) {
    onSubmit(values);
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editTodo ? "Edit Task" : "Add New Task"}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Enter task title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter task details" 
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="completed"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                      Mark as completed
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-sky-500 hover:bg-sky-600">
                Save Task
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
