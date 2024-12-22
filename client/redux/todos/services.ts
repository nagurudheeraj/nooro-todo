import { Todo } from "@/types/todo.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL for API requests
const baseurl = "http://localhost:8080";

// Fetch a single todo by ID
export const getSingleTodoAsync = createAsyncThunk<Todo, string>(
  "todos/getSingleTodoAsync",
  async (id: string) => {
    try {
      const response = await axios.get<Todo>(`${baseurl}/todos/${id}`);
      return response.data; // Return the single todo
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message || "Failed to fetch the todo");
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
);

// Fetch all todos
export const getTodosAsync = createAsyncThunk<Todo[]>(
  "todos/getTodosAsync",
  async () => {
    const res = await axios.get<Todo[]>(`${baseurl}/todos`);
    console.log("res", res);
    return res.data; // Return all todos
  }
);

// Clear completed todos
export const clearCompletedAsync = createAsyncThunk<void>(
  "todos/clearCompletedAsync",
  async () => {
    const res = await axios.delete(`${baseurl}/todos/clearcompleted`);
    return res.data; // No data returned after clearing
  }
);

// Add a new todo
export const addTodoAsync = createAsyncThunk<
  Todo,
  { title: string; color: string; completed: boolean }
>(
  "todos/addTodoAsync",
  async (data: { title: string; color: string; completed: boolean }) => {
    const res = await axios.post(`${baseurl}/todos`, data);
    console.log("res", res.data.todoId);
    const getTodo = await axios.get<Todo>(
      `${baseurl}/todos/${res.data.todoId}`
    );
    return getTodo.data; // Return the newly added todo
  }
);

// Edit an existing todo
export const editTodoAsync = createAsyncThunk<
  Todo,
  { id: string; data: { completed: boolean; color: string; title: string } }
>(
  "todos/editTodoAsync",
  async ({
    id,
    data,
  }: {
    id: string;
    data: { completed: boolean; color: string; title: string };
  }) => {
    console.log("I'm HErEEeeeeee", data);
    const res = await axios.put(`${baseurl}/todos/${id}`, data);
    console.log("res", res.data.todoId);
    const getTodo = await axios.get<Todo>(
      `${baseurl}/todos/${res.data.todoId}`
    );
    return getTodo.data; // Return the updated todo
  }
);

// Toggle todo completion status
export const toggleTodoAsync = createAsyncThunk<
  Todo,
  { id: string; data: { completed: boolean; color: string; title: string } }
>(
  "todos/toggleTodoAsync",
  async ({
    id,
    data,
  }: {
    id: string;
    data: { completed: boolean; color: string; title: string };
  }) => {
    try {
      console.log("Sending data to update todo", data);
      const response = await axios.put(`${baseurl}/todos/${id}`, data);
      return response.data; // Return the updated todo
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message || "Failed to fetch the todo");
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
);

// Remove a todo by ID
export const removeTodoAsync = createAsyncThunk<string, string>(
  "todos/removeTodoAsync",
  async (id: string) => {
    await axios.delete(`${baseurl}/todos/${id}`);
    return id; // Return the ID of the removed todo
  }
);
