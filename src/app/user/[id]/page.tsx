"use client";
import { useSession, signOut } from "next-auth/react";
import React from "react";
import toast from "react-hot-toast";
import InvalidSession from "~/app/redirects/invalid-session";
import { useRouter, useParams } from "next/navigation";
import UserTodos from "~/app/_components/user-todo";
const User: React.FC<any> = () => {
  const session = useSession();
  const router = useRouter();
  const userParams = useParams<{ id: string }>();
  if (session.status === "loading") {
    return;
  }
  if (session.status === "unauthenticated") {
    router.push("/");
    return;
  } else {
    if (session.data?.user.id !== userParams.id) {
      return <InvalidSession />;
    }

    const HandleSignOut = async () => {
      await signOut({ redirect: false });
      toast.success("signed out");
    };
    return <UserTodos HandleSignOut={HandleSignOut} />;
  }
};
export default User;
