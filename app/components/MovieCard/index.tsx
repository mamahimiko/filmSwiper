/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { MovieInfoType, MovieType, SwipeAction } from "@/app/types/types";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { Dispatch, SetStateAction, useEffect } from "react";

const MovieCard = ({
  movie,
  cards,
  setCards,
  setWatchList,
  action,
}: {
  movie: MovieType;
  cards: MovieType[];
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

  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const rotateRaw = useTransform(x, [-150, 150], [-15, 15]);

  const isFront = movieInfo.id === cards[cards.length - 1].id;

  const rotate = useTransform(() => {
    const offset = isFront ? 0 : movieInfo.id % 2 ? 6 : -6;
    return `${rotateRaw.get() + offset}deg`;
  });

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

    const targetX = action.type === "like" ? 200 : -200;

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

  return (
    <motion.img
      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
      alt={movie.title}
      className="w-50 md:w-80 object-cover rounded-sm origin-bottom hover:cursor-grab active:cursor-grabbing"
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        rotate,
        transition: "0.125s transform",
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
