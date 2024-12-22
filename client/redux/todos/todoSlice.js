import { createSlice } from "@reduxjs/toolkit";
import {
  getTodosAsync,
  addTodoAsync,
  toggleTodoAsync,
  removeTodoAsync,
  clearCompletedAsync,
} from "./services";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    activeFilter: localStorage.getItem("activeFilter") || "all",
    addNewTodo: {
      isLoading: false,
      error: false,
    },
  },
  reducers: {
    setFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
  // Thunks
  extraReducers: (builder) => {
    // Handle getTodosAsync actions
    builder
      .addCase(getTodosAsync.pending, (state) => {
        console.log("Pending");
        state.isLoading = true;
      })
      .addCase(getTodosAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(getTodosAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch todos";
      });

    // Handle addTodoAsync actions
    builder
      .addCase(addTodoAsync.pending, (state) => {
        state.addNewTodo.isLoading = true;
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.addNewTodo.isLoading = false;
      })
      .addCase(addTodoAsync.rejected, (state, action) => {
        state.addNewTodo.isLoading = false;
        state.addNewTodo.error = action.error.message || "Failed to add todo";
      });

    // Handle toggleTodoAsync actions
    builder.addCase(toggleTodoAsync.fulfilled, (state, action) => {
      const { id, completed } = action.payload.todo;
      console.log("index", id, completed);

      const index = state.items.findIndex((item) => item.id === id);
      console.log("index", index);
      if (index !== -1) {
        state.items[index].completed = completed;
      }
    });

    // Handle removeTodoAsync actions
    builder.addCase(removeTodoAsync.fulfilled, (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    });

    // Handle clearCompletedAsync actions
    builder.addCase(clearCompletedAsync.fulfilled, (state) => {
      state.items = state.items.filter((item) => !item.completed);
    });
  },
});

export const selectTodos = (state) => state.todos.items;

export const selectFilteredTodos = (state) => {
  if (state.todos.activeFilter === "all") {
    return state.todos.items;
  }
  return state.todos.items.filter((todo) =>
    state.todos.activeFilter === "active" ? !todo.completed : todo.completed
  );
};

export const selectActiveFilter = (state) => state.todos.activeFilter;

export const { addTodo, setFilter } = todosSlice.actions;
export default todosSlice.reducer;
