"use client";

import { useEffect, useState } from "react";
import { fetchMoviesByGenre, fetchMoviesGenres } from "./api/fetchApi";
import { useUserContext } from "./Context/userContext";
import { MovieType, UserContextType } from "./types/types";
import { GenreType } from "./types/types";
import SwipeCards from "./components/SwipeCards";
import { randomNumber } from "./utils/util";

export default function Home() {
  const { user } = useUserContext() as UserContextType;
  const [movies, setMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      const genreData = await fetchMoviesGenres();

      const usersGenreId = genreData.find(
        (genre: GenreType) => genre.name === user!.genre,
      );

      const moviesList = await fetchMoviesByGenre(usersGenreId!.id);
      const cardIndex = randomNumber(moviesList.length);
      const cardlist = cardIndex.map((i) => moviesList[i]);

      setMovies(cardlist);
    };
    getMovies();
  }, [user!.genre]);

  return (
    <div className=" text-mauve-200 flex flex-col h-full p-4">
      <div className="flex flex-col justify-center items-center lg:pt-20">
        <p className="text-lg">Hi, {user!.userName}</p>
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          Discover today&apos;s {user!.genre} movies you&apos;ll love, <br />
          one Flick at a time!
        </h2>
      </div>
      <div className="grow flex items-center justify-center pt-10 lg:pt-5">
        <SwipeCards
          key={movies.map((movie) => movie.id).join(",")}
          movies={movies}
        />
      </div>
    </div>
  );
}
