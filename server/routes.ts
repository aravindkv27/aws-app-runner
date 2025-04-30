import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTodoSchema, updateTodoSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Todos API routes
  app.get("/api/todos", async (req: Request, res: Response) => {
    try {
      const todos = await storage.getTodos();
      res.json(todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
      res.status(500).json({ message: "Failed to fetch todos" });
    }
  });

  app.get("/api/todos/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const todo = await storage.getTodo(id);
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      res.json(todo);
    } catch (error) {
      console.error("Error fetching todo:", error);
      res.status(500).json({ message: "Failed to fetch todo" });
    }
  });

  app.post("/api/todos", async (req: Request, res: Response) => {
    try {
      const validatedData = insertTodoSchema.safeParse(req.body);
      
      if (!validatedData.success) {
        const errorMessage = fromZodError(validatedData.error).message;
        return res.status(400).json({ message: errorMessage });
      }

      const newTodo = await storage.createTodo(validatedData.data);
      res.status(201).json(newTodo);
    } catch (error) {
      console.error("Error creating todo:", error);
      res.status(500).json({ message: "Failed to create todo" });
    }
  });

  app.patch("/api/todos/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const validatedData = updateTodoSchema.safeParse(req.body);
      if (!validatedData.success) {
        const errorMessage = fromZodError(validatedData.error).message;
        return res.status(400).json({ message: errorMessage });
      }

      const updatedTodo = await storage.updateTodo(id, validatedData.data);
      if (!updatedTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      res.json(updatedTodo);
    } catch (error) {
      console.error("Error updating todo:", error);
      res.status(500).json({ message: "Failed to update todo" });
    }
  });

  app.delete("/api/todos/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const success = await storage.deleteTodo(id);
      if (!success) {
        return res.status(404).json({ message: "Todo not found" });
      }

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting todo:", error);
      res.status(500).json({ message: "Failed to delete todo" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
