"use client";
import { useUserContext } from "@/app/Context/userContext";
import { ReactNode } from "react";
import Login from ".";
import Navigation from "../Navigation";
import { UserContextType } from "@/app/types/types";

const LoginWrapper = ({ children }: { children: ReactNode }) => {
  const { user } = useUserContext() as UserContextType;
  return (
    <div className="grow">
      {user ? (
        <>
          <Navigation />
          <div>{children}</div>
        </>
      ) : (
        <div className="flex justify-center items-center p-20">
          <Login />
        </div>
      )}
    </div>
  );
};

export default LoginWrapper;
