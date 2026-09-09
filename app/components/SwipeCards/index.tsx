"use client";

import { useEffect, useRef, useState } from "react";
import MovieCard from "../MovieCard";
import { MovieType, SwipeCardsType, UserContextType } from "@/app/types/types";
import Link from "next/link";
import { useUserContext } from "@/app/Context/userContext";

const SwipeCards = ({ movies }: SwipeCardsType) => {
  const { user, setUser } = useUserContext() as UserContextType;
  const [cards, setCards] = useState<MovieType[]>(movies);
  const [todaysWatchList, setTodaysWatchList] = useState<MovieType[]>([]);
  const hasSynced = useRef(false);

  useEffect(() => {
    if (
      cards.length === 0 &&
      todaysWatchList.length > 0 &&
      !hasSynced.current
    ) {
      hasSynced.current = true;
      setUser({ ...user!, watchList: [...user!.watchList, todaysWatchList] });
    }
  });

  console.log(user);

  return (
    <div className="grid place-items-center">
      {cards.length ? (
        <>
          {cards.map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                movie={movie}
                cards={cards}
                setCards={setCards}
                setWatchList={setTodaysWatchList}
              />
            );
          })}
        </>
      ) : (
        <div>
          <p>Finish!</p>
          {todaysWatchList.length ? (
            <div>
              <p>Here are your selected movies!</p>
              <div className="flex gap-2 ">
                {todaysWatchList.map((movie) => (
                  <Link key={movie.id} href={`/movies/${movie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      className="w-70"
                    />
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <p>Hmm... You do noy like movie?</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SwipeCards;
