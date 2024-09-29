import React, { useState } from "react";
import { todoProps } from "~/types";

const Todo: React.FC<todoProps> = ({ text, done, id, onToggle, onDelete }) => {
  const HandleToggle = (val: boolean) => {
    onToggle(id, val);
  };
  return (
    <div className="h-[80px] w-full border-2 border-zinc-300/50">
      <div className="relative flex h-full w-full items-center gap-5 bg-zinc-500/10 p-5">
        <span className="w-full p-2 font-light">{text}</span>
        <div className="absolute bottom-0 right-3 top-0 flex items-center justify-between gap-5 p-3 ">
          <input
            className="h-3 w-3"
            type="checkbox"
            defaultChecked={done}
            onChange={(e) => {
              HandleToggle(e.target.checked);
            }}
          ></input>
          <button
            onClick={(e) => {
              onDelete(id);
            }}
            className="text-lg"
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
