"use client";

// React & Next Core
import React, { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

// Ui components
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// Redux
import { useDispatch } from "react-redux";
import { editTodoAsync, getSingleTodoAsync } from "@/redux/todos/services";
import { AppDispatch } from "@/redux/store";

// Hooks
import { useToast } from "@/hooks/use-toast";

// Constants
import { colors } from "@/types/todo.constants";

// Icons
import { ArrowLeftIcon, CheckIcon } from "@heroicons/react/24/solid";

const EditTodoPage: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [selected, setSelected] = useState<string>(colors[0]);
  const [completed, setCompleted] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // Use useParams to access dynamic route parameters
  const params = useParams();
  const id = params.id as string; // Extract `id` from params

  // Fetch the Todo data when the `id` is available
  useEffect(() => {
    if (!id) return; // Ensure id is available before calling the fetch function

    const fetchTodo = async () => {
      try {
        const result = await dispatch(getSingleTodoAsync(id));
        if (result.payload) {
          setText(result.payload.title);
          setSelected(result.payload.color);
          setCompleted(result.payload.completed === 0 ? false : true);
        }
      } catch (error) {
        console.error("Failed to fetch todo:", error);
      }
    };

    fetchTodo(); // Call the async function to fetch Todo
  }, [dispatch, id]); // Dependencies array ensures it runs when id changes

  const { toast } = useToast();

  // Handle the form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!text) return; // Prevent submitting if the text is empty
    const data = {
      title: text,
      color: selected,
      completed: completed,
    };
    try {
      await dispatch(editTodoAsync({ data, id }));
      setText(""); // Clear text field after submission
      router.push("/"); // Redirect to home page after update
      toast({
        title: "Todo updated successfully",
      });
    } catch (error) {
      console.error("Error updating Todo:", error);
    }
  };

  // Handle color toggle change
  const handleToggleChange = (value: string) => {
    if (value === "") return; // Prevent deselection
    setSelected(value); // Update selected color
  };

  return (
    <form
      className="bg-[#1a1a1a] w-full flex flex-grow justify-center pb-20"
      onSubmit={handleSubmit}
    >
      <div className="w-[95vw] lg:w-1/2 text-white pt-24">
        <div className="flex justify-between items-center">
          <Link href="/">
            <ArrowLeftIcon className="size-6 text-white-500" />
          </Link>
          <div className="flex items-center gap-4 ">
            <p className="font-black text-primaryBg">Completed</p>
            <Checkbox
              className="border-2 w-6 h-6 bg-[#262626] border-slate-500"
              checked={completed}
              onCheckedChange={() => setCompleted(!completed)}
            />
          </div>
        </div>

        <div className="mt-16">
          {/* Title Field */}
          <div>
            <label className="text-sm font-black text-primaryBg">Title</label>
            <input
              type="text"
              value={text}
              className="w-full bg-[#262626] h-14 p-4 rounded-lg mt-2 mb-7 border border-[#444343] focus:bg-none"
              placeholder="Ex. Brush your teeth"
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          {/* Color Selection */}
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
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#1d70a0] text-[#f2f2f2] w-full h-14 text-base font-bold hover:bg-[#468eb8] flex justify-center items-center gap-4 rounded-md mt-16"
        >
          Edit Task
          <CheckIcon className="size-6 text-white-500" />
        </button>
      </div>
    </form>
  );
};

export default EditTodoPage;
