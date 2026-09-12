"use client";
import { useUserContext } from "@/app/Context/userContext";
import { ReactNode } from "react";
import Login from ".";
import Navigation from "../Navigation";
import { UserContextType } from "@/app/types/types";
import Logout from "../Logout";

const LoginWrapper = ({ children }: { children: ReactNode }) => {
  const { user } = useUserContext() as UserContextType;
  return (
    <div className="grow flex flex-col bg-linear-to-t from-amber-400 to-pink-600">
      {user ? (
        <>
          <Navigation />
          <div className="grow flex flex-col static">
            {children}
            <div className="fixed bottom-5 right-5 md:bottom-10 md:right-10">
              <Logout />
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center p-6 grow bg-linear-to-t from-amber-400 to-pink-600">
          <Login />
        </div>
      )}
    </div>
  );
};

export default LoginWrapper;
