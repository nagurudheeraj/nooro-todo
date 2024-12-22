"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

// Importing UI components for the alert dialog
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Redux Store and Dispatch
import { RootState, AppDispatch } from "@/redux/store";

// Redux actions and selectors
import { removeTodoAsync, toggleTodoAsync } from "@/redux/todos/services";
import { selectFilteredTodos } from "@/redux/todos/todoSlice";

// Error and Loading components
import Error from "@/app/components/Error";
import Loading from "@/app/components/Loading";

// Types for Todo
import { Todo } from "@/types/todo.types";

const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();

  // Redux state
  const filteredTodos = useSelector(selectFilteredTodos);
  const isLoading = useSelector((state: RootState) => state.todos.isLoading);
  const error = useSelector((state: RootState) => state.todos.error);


  // Local state for checkbox
  const [checked, setChecked] = useState(false);


  // Handle toggle for completing/incompleting a task
  const handleToggle = async (item: Todo) => {
    const data = {
      completed: !item.completed,
      color: item.color,
      title: item.title,
    };
    await dispatch(toggleTodoAsync({ id: item.id, data })).unwrap();
    setChecked(!checked);
  };

  // Handle task deletion
  const handleDestroy = async (id: string) => {
    await dispatch(removeTodoAsync(id));
    toast({
      title: "Todo deleted successfully",
    });
  };

  // Show loading or error states
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div>
      <ul className="todo-list">
        {filteredTodos
          .slice() // To prevent mutating the original list
          .reverse() // Reverse the list to display the newest first
          .map((todo: Todo) => (
            <li
              key={todo.id}
              className={`${
                todo.completed ? "completed" : ""
              } flex gap-4 bg-[#262626] p-4 rounded-md mb-3 border border-[#444343]`}
            >
              <Checkbox
                className={`rounded-full border-2 w-5 h-5 m-1 bg-${todo.color}`}
                style={{
                  borderColor: todo.color,
                  backgroundColor: todo.completed ? todo.color : "#262626",
                }}
                checked={todo.completed}
                onCheckedChange={() => handleToggle(todo)}
              />
              <div className="todo-card flex-grow text-slate-100 cursor-pointer">
                <Link href={"/edit-todo/" + todo.id}>
                  <p
                    className={
                      todo.completed ? "line-through text-gray-500" : ""
                    }
                  >
                    {todo.title}
                  </p>
                </Link>
              </div>
              <div className="action-item my-auto">
                <AlertDialog>
                  <AlertDialogTrigger>
                    <div className="cursor-pointer px-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5 text-slate-400 hover:text-red-300"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-[#1a1a1a] text-white border-gray-700">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action is irreversible. It will permanently delete
                        your task and remove all associated data from the
                        database.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="text-gray-900">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDestroy(todo.id)}
                        className="hover:bg-red-500 bg-red-400"
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TodoList;
