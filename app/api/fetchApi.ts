import { GenreType } from "../types/types";

export const fetchMoviesGenres = async (): Promise<GenreType[]> => {
  const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_AccessToken}`,
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Failed to fetch movie genre");
    }
    const data = await response.json();
    return data.genres;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchMoviesByGenre = async (genreId: number) => {
  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_AccessToken}`,
    },
  };
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Failed to fetch movie genre");
    }
    const data = await response.json();
    return data.results;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchGenreIdbyName = async (genre: string) => {
  const genreList = await fetchMoviesGenres();
  const genreId = genreList.find((g) => g.name === genre);
  return genreId!.id;
};

export const fetchMovieDetails = async (id: number) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_AccessToken}`,
    },
  };
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Failed to fetch movie genre");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchCredits = async (id: number) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_AccessToken}`,
    },
  };
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Failed to fetch movie genre");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const fetchThumbnails = async () => {
  const genres = await fetchMoviesGenres();

  const genreMovieCandidates = await Promise.all(
    genres.map(async (genre: { id: number; name: string }) => {
      const movies = await fetchMoviesByGenre(genre.id);
      return {
        genreId: genre.id,
        genreName: genre.name,
        candidates: movies,
      };
    }),
  );
  const useMovieIds = new Set<number>();
  const thumbnails = genreMovieCandidates.map(
    ({ genreId, genreName, candidates }) => {
      const unusedMovie = candidates.find(
        (movie: { id: number }) => !useMovieIds.has(movie.id),
      );

      if (unusedMovie) {
        useMovieIds.add(unusedMovie.id);
      }
      const selectedMovie = unusedMovie ?? candidates[0];
      return {
        genreId,
        genreName,
        posterPath: selectedMovie?.poster_path,
      };
    },
  );
  return thumbnails;
};
