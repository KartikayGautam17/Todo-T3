"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Todo from "./_components/todo";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Emailvalidator from "email-validator";
const Home = () => {
  const session = useSession();
  const [email, setEmail] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/user/" + session.data.user.id);
    }
  }, [session]);
  const HandleLogin = async () => {
    if (!Emailvalidator.validate(email)) {
      toast.error("Invalid email");
      return;
    }
    await signIn("email", { email });
    //signIn();
  };
  const demoTodoText = "just some random todoTextlmaomorem oremore";
  return (
    <div>
      <div className="flex h-[100vh] w-full flex-col items-center justify-start gap-10 p-16">
        <div className="  flex w-[400px]  flex-col gap-5 rounded-md border-2 border-zinc-400 p-5">
          {session.data && <div>Logged in as {session.data.user?.email}</div>}
          <input
            type="email"
            className="rounded-sm border-2 border-zinc-300 bg-transparent p-2 outline-2 outline-zinc-500"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <button
            onClick={HandleLogin}
            className="w-full rounded-md bg-zinc-300 p-2 hover:bg-zinc-500 hover:text-white"
          >
            Sign in
          </button>
        </div>
        <div className="w-[400px]"></div>
      </div>
    </div>
  );
};

export default Home;
