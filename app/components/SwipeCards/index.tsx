"use client";

import { useEffect, useRef, useState } from "react";
import MovieCard from "../MovieCard";
import {
  MovieType,
  SwipeAction,
  SwipeCardsType,
  UserContextType,
} from "@/app/types/types";
import Link from "next/link";
import { useUserContext } from "@/app/Context/userContext";
import SwipeBtn from "../SwipeBtn";

const SwipeCards = ({ movies }: SwipeCardsType) => {
  const { user, setUser } = useUserContext() as UserContextType;
  const [cards, setCards] = useState<MovieType[]>(movies);
  const [todaysWatchList, setTodaysWatchList] = useState<MovieType[]>([]);
  const [action, setAction] = useState<SwipeAction>(null);
  const hasSynced = useRef(false);

  useEffect(() => {
    if (
      cards.length === 0 &&
      todaysWatchList.length > 0 &&
      !hasSynced.current &&
      user
    ) {
      hasSynced.current = true;
      setUser({
        ...user,
        watchList: [
          ...user.watchList,
          ...todaysWatchList.filter(
            (todayMovie) =>
              !user.watchList.some(
                (savedMovie) => savedMovie.id === todayMovie.id,
              ),
          ),
        ],
      });
    }
  }, [cards.length, todaysWatchList, setUser]);

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
                action={action}
              />
            );
          })}
          <SwipeBtn setAction={setAction} cards={cards} />
        </>
      ) : (
        <div className="text-center">
          <p className="font-bold text-4xl">Finish!</p>
          {todaysWatchList.length ? (
            <div className="p-4">
              <p>Here are your selected movies!</p>
              <div className="flex flex-wrap gap-2 p-4 justify-center">
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
