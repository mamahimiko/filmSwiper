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
    <div className="bg-gray-800 text-mauve-200 h-screen">
      <p>Hi {user!.userName}</p>
      <p>Swipe todays your favourite {user!.genre} movies!</p>
      <SwipeCards
        key={movies.map((movie) => movie.id).join(",")}
        movies={movies}
      />
    </div>
  );
}
