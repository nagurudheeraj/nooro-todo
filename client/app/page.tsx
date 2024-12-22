import Content from "@/app/components/Content";
import CreateTodo from "./components/CreateTodo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todo App",
  description:
    "A simple and effective Todo application designed to help users organize and track their to-do lists and  built using Next.js, Express.js, TypeScript, and MySQL. It leverages Clever Cloud for hosting the MySQL database.",
};

const Home: React.FC = () => {
  return (
    <>
      <section className="todoapp relative w-full min-h-screen flex flex-col bg-[#1a1a1a]">
        <CreateTodo />
        <Content />
      </section>
    </>
  );
};

export default Home;
