"use client";
import React from "react";
import { SessionProvider, SessionProviderProps } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
const SessionContext: React.FC<SessionProviderProps> = ({ children }) => {
  return (
    <SessionProvider>
      <Toaster />
      {children}
    </SessionProvider>
  );
};

export default SessionContext;
