/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { MovieInfoType, MovieType, SwipeAction } from "@/app/types/types";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { Dispatch, SetStateAction, useEffect } from "react";

const MovieCard = ({
  movie,
  isFront,
  zIndex,
  setCards,
  setWatchList,
  action,
}: {
  movie: MovieType;
  isFront: boolean;
  zIndex: number;
  setCards: Dispatch<SetStateAction<MovieType[]>>;
  setWatchList: Dispatch<SetStateAction<MovieInfoType[]>>;
  action: SwipeAction;
}) => {
  const movieInfo: MovieInfoType = {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
  };

  const x = useMotionValue(0);

  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  const rotateRaw = useTransform(x, [-150, 150], [-15, 15]);

  const offset = useMotionValue(isFront ? 0 : movie.id % 2 ? 6 : -6);
  useEffect(() => {
    offset.set(isFront ? 0 : movie.id % 2 ? 6 : -6);
  }, [isFront]);
  const rotate = useTransform(
    [rotateRaw, offset],
    ([r, o]: number[]) => `${r + o}deg`,
  );

  const handleDragEnd = () => {
    const liked = x.get() > 70;

    if (liked) {
      setWatchList((prev) =>
        prev.find((m) => m.id === movieInfo.id) ? prev : [...prev, movieInfo],
      );
      setCards((prev) => prev.filter((card) => card.id !== movieInfo.id));
    } else if (x.get() < -70) {
      setCards((prev) => prev.filter((card) => card.id !== movieInfo.id));
    }
  };

  useEffect(() => {
    if (!action || !isFront || action.movieId !== movie.id) {
      return;
    }

    const targetX = action.type === "like" ? 300 : -300;

    const controls = animate(x, targetX, {
      duration: 0.4,
    });

    controls.then(() => {
      if (action.type === "like") {
        setWatchList((prev) =>
          prev.some((m) => m.id === movieInfo.id) ? prev : [...prev, movieInfo],
        );
      }

      setCards((prev) => prev.filter((card) => card.id !== movie.id));
    });
    return () => controls.stop();
  }, [action, isFront]);

  const boxShadow = useTransform(
    x,
    [-150, -50, 0, 50, 150],
    [
      "0 0 0 10px #000000",
      "0 0 0 10px #000000",
      "0 0 0 0px rgba(0,0,0,0)",
      "0 0 0 10px #40b1b4",
      "0 0 0 10px #40b1b4",
    ],
  );

  console.log(action);

  return (
    <motion.img
      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
      alt={movie.title}
      className="w-50 md:w-80 object-cover rounded-sm origin-bottom hover:cursor-grab active:cursor-grabbing"
      style={{
        gridRow: 1,
        gridColumn: 1,
        zIndex,
        x,
        opacity,
        rotate,
        boxShadow,
      }}
      whileHover={{ scale: 1.1 }}
      drag="x"
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      onDragEnd={handleDragEnd}
    />
  );
};

export default MovieCard;
