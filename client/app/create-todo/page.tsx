"use client";

// React Core
import React, { useState, useEffect, FormEvent } from "react";

// Next.js Core
import Link from "next/link";
import { useRouter } from "next/navigation";

// Ui components
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// Redux imports
import { useDispatch } from "react-redux";
import { addTodoAsync } from "@/redux/todos/services";
import { AppDispatch } from "@/redux/store";

// Hooks
import { useToast } from "@/hooks/use-toast";

// Icons
import {
  ArrowLeftIcon,
  CheckIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";

// Constants
import { colors } from "@/types/todo.constants";

const AddTodoPage: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [text, setText] = useState<string>("");
  const [selected, setSelected] = useState<string>(colors[0]);

  const dispatch = useDispatch<AppDispatch>();

  // Handle form submission for adding a new todo
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!text) return;

    // Dispatch the action to add a new todo
    await dispatch(
      addTodoAsync({ title: text, color: selected, completed: false })
    );

    setText(""); // Clear the input field
    router.push("/"); // Redirect to the homepage
    toast({
      title: "Todo created successfully",
    });
  };

  // Handle color toggle change
  const handleToggleChange = (value: string) => {
    if (value === "") return; // Prevent deselection
    setSelected(value); // Update the selected color
  };

  // Log the selected color whenever it changes
  useEffect(() => {
    console.log("Toggled option:", selected);
  }, [selected]);

  return (
    <form
      className="bg-[#1a1a1a] w-full flex flex-grow justify-center pb-20"
      onSubmit={handleSubmit}
    >
      <div className="w-[95vw] lg:w-1/2 text-white pt-20">
        <Link href="/" className="">
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
                type="single" // Single selection (radio-like behavior)
                value={selected} // Controlled component: passing the selected option to value
                onValueChange={handleToggleChange} // Update state on toggle change
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
        </div>

        <button
          type="submit"
          className="bg-[#1d70a0] text-[#f2f2f2] w-full h-14 text-base font-bold hover:bg-[#468eb8] flex justify-center items-center gap-4 rounded-md mt-16"
        >
          Add Task
          <PlusCircleIcon className="size-6 text-white-500" />
        </button>
      </div>
    </form>
  );
};

export default AddTodoPage;
