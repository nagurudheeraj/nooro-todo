"use client";

// React Core
import React, { useEffect, useState } from "react";

// Redux Store and Dispatch
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

// Components
import NoTodos from "@/app/components/NoTodos";
import TodoList from "@/app/components/TodoList";

// Redux Actions and Selectors
import { getTodosAsync } from "@/redux/todos/services";
import {
  selectActiveFilter,
  selectTodos,
  setFilter,
} from "@/redux/todos/todoSlice";

// UI Components
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Types
import { Todo } from "@/types/todo.types";

const Content: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  const items = useSelector(selectTodos);
  const activeFilter = useSelector(selectActiveFilter);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("activeFilter", activeFilter);
  }, [activeFilter]);

  console.log("items", items);

  const completedCount = items.filter((item: Todo) => item.completed).length;

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
    switch (value) {
      case "All":
        dispatch(setFilter("all"));
        break;
      case "Todo":
        dispatch(setFilter("active"));
        break;
      case "Completed":
        dispatch(setFilter("completed"));
        break;
    }
  };

  return (
    <section className="main w-[95vw] lg:w-1/2 mx-auto pt-24 pb-20">
      <div className="tasks-overview pb-7">
        <div className="flex justify-between items-center">
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-8">
            <div className="task-status flex gap-4">
              <p className="font-bold text-primaryBg">Tasks</p>
              <Badge className="bg-[#262626] rounded-full">
                {items.length}
              </Badge>
            </div>
            <div className="task-completion flex gap-4">
              <p className="font-bold text-secondaryBg">Completed</p>
              <Badge className="bg-[#262626] rounded-full">
                {completedCount} of {items.length}
              </Badge>
            </div>
          </div>
          <div className="flex gap-4">
            <Select value={selectedFilter} onValueChange={handleFilterChange}>
              <SelectTrigger className="w-[120px] bg-[#262626] border-none text-white">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent className="bg-[#262626] border-gray-700 text-white">
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Todo">Todo</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {items?.length > 0 ? <TodoList /> : <NoTodos />}
    </section>
  );
};

export default Content;
