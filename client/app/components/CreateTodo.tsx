"use client";

// Next.js Core
import Link from "next/link";

const CreateTodo: React.FC = () => {
  return (
    <div className="absolute top-[-32px] w-full flex justify-center">
      <div className="w-3/4 lg:w-1/2">
        <Link
          href="/create-todo"
          className="bg-[#1d70a0] text-[#f2f2f2] w-full h-14 text-base font-bold hover:bg-[#468eb8] flex justify-center items-center gap-4 rounded-md"
        >
          Create Task
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-circle-plus"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8" />
            <path d="M12 8v8" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default CreateTodo;
