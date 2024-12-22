import express from "express";
const router = express.Router();

import * as todoController from "../controller/todoController";


// Route for getting all todos
router.get("/todos", todoController.getAllTodos);

// Route for getting a todo by ID
router.get("/todos/:id", todoController.getTodoById);

// Route for creating a new todo
router.post("/todos", todoController.createTodo);

// Route for updating a todo by ID
router.put("/todos/:id", todoController.updateTodo);

// Route for deleting a todo by ID
router.delete("/todos/:id", todoController.deleteTodoById);

export default router;
