import { z } from "zod";
import { Todos } from "@prisma/client";
export const todoInput = z
  .string({
    required_error: "Describe your task",
  })
  .min(1)
  .max(50);

export type todoProps = {
  id: string;
  text: string;
  done: boolean;
  onToggle: (id: string, done: boolean) => void;
  onDelete: (id: string) => void;
};

export type UserTodos = {
  HandleSignOut: () => void;
};
