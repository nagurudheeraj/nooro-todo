import { pool } from "../db/db";
import { RowDataPacket, ResultSetHeader, Pool } from "mysql2/promise";

import {
  Todo,
  InsertResult,
  TableCheckResult,
  DeleteTodoResult,
} from "../types/todo.types";

// Function to get all todos
export async function getTodos(): Promise<Todo[]> {
  const [rows] = await pool.query("SELECT * FROM todos");
  return rows as Todo[];
}

// Function to get a single todo by ID
export async function getTodoById(id: number): Promise<Todo | null> {
  const [rows] = await pool.query("SELECT * FROM todos WHERE id = ?", [id]);

  // Type assertion to specify that rows is an array of Todo objects
  const todo = rows as Todo[];

  // Return the first matching row or undefined if not found
  if (todo) return todo[0];

  return null;
}

// Function to insert a new todo
export async function insertTodo(
  title: string,
  color: string,
  completed: boolean = false
): Promise<InsertResult> {
  const [result] = await pool.query(
    "INSERT INTO todos (title, color, completed) VALUES (?, ?, ?)",
    [title, color, completed]
  );
  return result as InsertResult;
}

// Function to update a todo by ID
export async function editTodo(
  id: number,
  title: string,
  color: string,
  completed: boolean | undefined
): Promise<Todo | null> {
  console.log("Params received:", { id, title, color, completed });

  try {
    // Perform the update query
    const [result] = await pool.query(
      "UPDATE todos SET title = ?, color = ?, completed = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?",
      [title, color, completed, id]
    );

    console.log("Update Result:", result);

    // If no rows were affected, the todo wasn't found
    if ((result as { affectedRows: number }).affectedRows === 0) {
      console.log("No rows were updated. Todo not found.");
      return null; // If no rows were updated, return null
    }

    // Fetch the updated todo from the database
    const updatedTodo = await getTodoById(+id);

    return updatedTodo; // Return the updated todo or null if not found
  } catch (error) {
    console.error(
      "Error updating todo:",
      error instanceof Error ? error.message : error
    );
    throw error; // Throw error to be handled by the caller
  }
}

// Function to delete a todo by ID
export async function deleteTodo(id: number): Promise<DeleteTodoResult | null> {
  const [result] = await pool.query<ResultSetHeader>(
    "DELETE FROM todos WHERE id = ?",
    [id]
  );

  if (result?.affectedRows === 0) {
    return null; // If no rows were deleted, return null
  }

  return { message: `Todo with ID ${id} deleted successfully`, id };
}

// Function to check if a table exists
export async function ensureTableExists(): Promise<void> {
  const tableCheckQuery = `
    SELECT COUNT(*) AS tableExists
    FROM information_schema.tables
    WHERE table_name = 'todos'
      AND table_schema = DATABASE();
  `;
  const tableCreateQuery = `
    CREATE TABLE todos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      color VARCHAR(50) NOT NULL,
      completed BOOLEAN DEFAULT false,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;

  try {
    // Check if the table exists
    const [rows] = await pool.query<RowDataPacket[]>(tableCheckQuery);

    // Cast the rows to the expected type
    const tableExists = (rows[0] as TableCheckResult).tableExists;

    if (!tableExists) {
      // Create the table if it doesn't exist
      await pool.query(tableCreateQuery);
      console.log("Table 'todos' created successfully.");
    }
  } catch (err: unknown) {
    console.error(
      "Error ensuring table exists:",
      err instanceof Error ? err.message : err
    );
    throw new Error("Database setup failed.");
  }
}
