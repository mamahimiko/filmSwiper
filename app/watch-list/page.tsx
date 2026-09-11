/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useUserContext } from "../Context/userContext";
import { UserContextType } from "../types/types";
import ProfileCard from "../components/Profile-card";

const WatchList = () => {
  const { user } = useUserContext() as UserContextType;

  return (
    <div className="p-10 flex flex-col justify-center items-center">
      {user && (
        <>
          <ProfileCard {...user} />
          {user.watchList.length ? (
            <div className="flex flex-col justify-center">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-center">
                  Which movie do you want to watch next?
                </h2>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {user.watchList.map((movie) => (
                  <Link
                    href={`/movies/${movie.id}`}
                    key={movie.id}
                    className="text-center w-50 lg:w-70"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full"
                    />
                    <div className="flex flex-wrap justify-center">
                      <p className="">{movie.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full py-40">
              <div className=" flex flex-col items-center justify-center">
                <p>Add movies you are interested in!</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default WatchList;
