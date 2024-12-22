import { Request, Response } from "express";
import * as todoService from "../service/todoService";

import { Todo, TodoRequestBody } from "../types/todo.types";

// Get  all todos
export const getAllTodos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const todos = await todoService.getTodos();
    res.status(200).json(todos);
  } catch (err: unknown) {
    res.status(500).json({
      error: "Failed to fetch todos",
      info: err instanceof Error ? err.message : "Unknown error occurred",
    });
  }
};

// Get a single todo by ID
export const getTodoById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const todoId: number = parseInt(id);

    if (isNaN(todoId)) {
      res.status(400).json({ error: "Invalid Todo ID" });
      return;
    }

    const todo: Todo | null = await todoService.getTodoById(todoId);

    if (!todo) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }

    res.status(200).json(todo);
  } catch (err: unknown) {
    console.error(
      "Error fetching todo by ID:",
      err instanceof Error ? err.message : err
    );
    res.status(500).json({ error: "Failed to fetch todo" });
  }
};

// Create a new todo
export async function createTodo(req: Request, res: Response): Promise<void> {
  const { title, color, completed = false }: TodoRequestBody = req.body;

  if (!title || !color) {
    res.status(400).json({ error: "Title and color are required." });
    return;
  }

  try {
    const result = await todoService.insertTodo(title, color, completed);
    res.status(201).json({
      message: "Todo created successfully",
      todoId: result.insertId,
    });
    return;
  } catch (err: unknown) {
    console.error(
      "Error creating todo:",
      err instanceof Error ? err.message : err
    );
    res.status(500).json({ error: "Failed to create todo" });
    return;
  }
}

// Update a todo by ID

export async function updateTodo(
  req: Request<{ id: string }, TodoRequestBody>,
  res: Response
): Promise<void> {
  const { id } = req.params;
  const todoId: number = parseInt(id);

  const { title, color, completed } = req.body;

  // Validate the required fields
  if (!title || !color) {
    res.status(400).json({ error: "Title and color are required." });
    return;
  }

  try {
    // Call the editTodo service to update the todo
    const updatedTodo = await todoService.editTodo(
      todoId,
      title,
      color,
      completed
    );

    if (!updatedTodo) {
      res.status(404).json({ error: "Todo not found or update failed" });
      return;
    }

    console.log("Todo updated successfully:", updatedTodo);
    res.status(200).json({
      message: "Todo updated successfully",
      todo: updatedTodo,
    });
  } catch (err: unknown) {
    console.error(
      "Error updating todo:",
      err instanceof Error ? err.message : err
    );
    console.error(err instanceof Error ? err.stack : err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Delete a todo by ID
export async function deleteTodoById(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params;

  try {
    const result = await todoService.deleteTodo(+id);

    if (!result) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }

    res.status(200).json({ message: "Todo deleted successfully", todoId: id });
  } catch (err) {
    console.error(
      "Error deleting todo:",
      err instanceof Error ? err.message : err
    );
    res.status(500).json({ error: "Internal server error" });
  }
}
