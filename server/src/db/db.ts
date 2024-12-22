import mysql from "mysql2/promise";

import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

// Create a MySQL database connection pool
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
