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
