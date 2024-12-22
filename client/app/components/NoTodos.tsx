// Import React and necessary types from React
import React from "react";

// SVG icon for an empty task list
const EmptyTaskList: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="70"
      height="70"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-notepad-text text-[#292929]"
    >
      <path d="M8 2v4" />
      <path d="M12 2v4" />
      <path d="M16 2v4" />
      <rect width="16" height="18" x="4" y="4" rx="2" />
      <path d="M8 10h6" />
      <path d="M8 14h8" />
      <path d="M8 18h5" />
    </svg>
  );
};

// Component to display when there are no tasks
const NoTodos: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center border-t-2 rounded border-[#292929] border-opacity-100 p-10">
      <EmptyTaskList />
      <p className="text-center text-gray-600 font-bold mt-10">
        You don&apos;t have any tasks registered yet.
      </p>

      <p className="text-center text-gray-600 my-4">
        Create tasks and organize your todo items.
      </p>
    </div>
  );
};

export default NoTodos;
