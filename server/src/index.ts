import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ensureTableExists } from "./service/todoService";

dotenv.config();

// Routes
import todoRoutes from "./routes/todoRoutes";

// Initialize Express app
const app = express();
const port = process.env.PORT || "8080";

// Middleware to parse JSON
app.use(express.json());
dotenv.config(); // Load environment variables from .env file

// Enable CORS for your frontend domain (localhost:3000)
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
  })
);

// Perform table check once on startup
async function initializeApp() {
  try {
    await ensureTableExists(); // Ensure the table is created at startup if it doesn't exist
    console.log("App initialized successfully.");
  } catch (err) {
    console.error("Error during app initialization:", err);
  }
}

initializeApp();

// Use todo routes
app.use(todoRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
