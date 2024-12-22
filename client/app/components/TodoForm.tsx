"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeftIcon,
  CheckIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { addTodoAsync, editTodoAsync } from "@/redux/todos/services";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Constants for color options
const colors: string[] = [
  "#0074D9",
  "#39CCCC",
  "#ff0000",
  "#FF851B",
  "#FFDC00",
  "#2ECC40",
  "#B10DC9",
  "#F012BE",
  "#795548",
];

// Props for the TodoForm component
interface TodoFormProps {
  initialTitle?: string;
  initialColor?: string;
  initialCompleted?: boolean;
  todoId?: string;
  actionType: "add" | "edit";
}

const TodoForm: React.FC<TodoFormProps> = ({
  initialTitle = "",
  initialColor = colors[0],
  initialCompleted = false,
  todoId,
  actionType,
}) => {
  const [text, setText] = useState<string>(initialTitle);
  const [selected, setSelected] = useState<string>(initialColor);
  const [completed, setCompleted] = useState<boolean>(initialCompleted);
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // Handle form submission for creating or editing a todo
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!text) return;

    const todoData = { title: text, color: selected, completed };
    if (actionType === "add") {
      await dispatch(addTodoAsync(todoData));
      toast({ title: "Todo created successfully" });
    } else {
      if (!todoId) return; // Ensure todoId is available for edit
      await dispatch(editTodoAsync({ data: todoData, id: todoId }));
      toast({ title: "Todo updated successfully" });
    }

    setText(""); // Clear input field
    router.push("/"); // Redirect to homepage
  };

  // Handle color selection toggle
  const handleToggleChange = (value: string) => {
    if (value === "") return; // Prevent deselection
    setSelected(value);
  };

  // Log selected color (for debugging purposes)
  useEffect(() => {
    console.log("Toggled option:", selected);
  }, [selected]);

  return (
    <form
      className="bg-[#1a1a1a] w-full flex flex-grow justify-center pb-20"
      onSubmit={handleSubmit}
    >
      <div className="w-[95vw] lg:w-1/2 text-white pt-20">
        <Link href="/">
          <ArrowLeftIcon className="size-6 text-white-500" />
        </Link>

        <div className="mt-10">
          <div>
            <label className="text-sm font-black text-primaryBg">Title</label>
            <input
              type="text"
              className="w-full bg-[#262626] h-14 p-4 rounded-lg mt-2 mb-7 border border-[#444343] focus:bg-none"
              placeholder="Ex. Brush your teeth"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-black text-primaryBg">Colors</label>
            <div className="colors mt-2 mb-10">
              <ToggleGroup
                type="single"
                value={selected}
                onValueChange={handleToggleChange}
                className="grid grid-cols-5 lg:flex gap-4 justify-start"
              >
                {colors.map((color, index) => (
                  <ToggleGroupItem
                    key={index}
                    value={color}
                    className={`color-circle ${
                      selected === color
                        ? "border-4 border-spacing-28 border-[#656565] selected"
                        : ""
                    } w-14 h-14 rounded-full cursor-pointer`}
                    style={{ backgroundColor: color }}
                  >
                    {selected === color && (
                      <CheckIcon className="size-6 text-white-500" />
                    )}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </div>

          {actionType === "edit" && (
            <div className="flex items-center gap-4">
              <p className="font-black text-primaryBg">Completed</p>
              <Checkbox
                className="border-2 w-6 h-6 bg-[#262626] border-slate-500"
                checked={completed}
                onCheckedChange={() => setCompleted(!completed)}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-[#1d70a0] text-[#f2f2f2] w-full h-14 text-base font-bold hover:bg-[#468eb8] flex justify-center items-center gap-4 rounded-md mt-16"
        >
          {actionType === "add" ? "Add Task" : "Edit Task"}
          <PlusCircleIcon className="size-6 text-white-500" />
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
