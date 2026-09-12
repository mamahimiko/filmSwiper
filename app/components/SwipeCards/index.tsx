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
import { motion } from "motion/react";

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
  }, [cards.length, todaysWatchList, setUser, user]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

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
              <p>Here are your picked movies!</p>
              <motion.ul
                variants={container}
                initial="hidden"
                animate="show"
                className="flex flex-wrap gap-2 p-4 justify-center"
              >
                {todaysWatchList.map((movie) => (
                  <motion.li key={movie.id} variants={item}>
                    <Link href={`/movies/${movie.id}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                        className="w-70"
                      />
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          ) : (
            <p>Hmm... You do not like movie?</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SwipeCards;
