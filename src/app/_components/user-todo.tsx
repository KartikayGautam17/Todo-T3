"use client";
import React, { useState } from "react";
import type { UserTodos } from "~/types";
import { AppRouter } from "~/server/api/root";
import { createTRPCReact } from "@trpc/react-query";
import Todo from "./todo";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
const UserTodos: React.FC<UserTodos> = ({ HandleSignOut }) => {
  const [text, setText] = useState("");
  const api = createTRPCReact<AppRouter>();
  const todos = api.todos.all.useQuery();
  const create_handler = api.todos.create.useMutation();
  const delete_handler = api.todos.delete.useMutation();
  const toggle_handler = api.todos.toggle.useMutation();
  const session = useSession();
  const AddTodo = () => {
    create_handler.mutate(text, {
      async onSuccess() {
        toast.success("Todo Added");
        setText("");
        await todos.refetch();
      },
      onError() {
        toast.error("Could not add");
      },
    });
  };
  const DeleteTodo = (id: string) => {
    delete_handler.mutate(id, {
      async onSuccess() {
        toast.success("Todo Deleted");
        await todos.refetch();
      },
    });
    setText(text);
  };
  const ToggleTodo = (id: string, done: boolean) => {
    toggle_handler.mutate(
      { id, done },
      {
        onSuccess() {
          toast.success("Todo marked as " + done);
        },
      },
    );
  };

  return (
    <div className="flex h-[100vh] flex-col w-full items-center justify-center">
      <div
        id="main-container"
        className="mb-10 flex h-[600px] w-[500px] flex-col justify-start gap-10 border-2 p-5 pt-8 "
      >
        <div>Logged in as {session.data?.user.email}</div>
        <div id="create-input" className="w-full flex items-center gap-0  ">
          <input
            placeholder="Enter value"
            className="h-[50px] w-full p-3 outline-0 border-2 border-r-0"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          ></input>
          <button
            onClick={AddTodo}
            className="flex h-[50px] w-[100px] items-center justify-center   p-5 font-light text-sm text-slate-600 hover:bg-red-400 border-2 border-red-400  hover:text-white"
          >
            +
          </button>
        </div>
        <div
          id="todos-container"
          className="w-full flex flex-col gap-5 overflow-y-auto h-[500px]"
        >
          {todos.data?.map((val) => {
            return (
              <Todo
                text={val.text}
                done={val.done}
                onToggle={ToggleTodo}
                onDelete={DeleteTodo}
                id={val.id}
                key={val.id}
              />
            );
          })}
        </div>
        <button
          onClick={async () => {
            await signOut({ redirect: false });
          }}
          className="p-5 flex items-center justify-center bg-zinc-300/50"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default UserTodos;
