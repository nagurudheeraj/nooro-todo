import Content from "@/app/components/Content";
import CreateTodo from "./components/CreateTodo";
import React from "react";

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
