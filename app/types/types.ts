export type UserType = {
  id: number;
  userName: string;
  password: string;
  genre: string;
  watchList: MovieInfoType[];
};

export type MovieType = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  genre_ids: [];
  genre: GenreType;
};

export type MovieInfoType = {
  id: number;
  title: string;
  poster_path: string;
};

export type SwipeCardsType = {
  movies: MovieType[];
};

export type UserContextType = {
  user: UserType | null;
  setUser: (user: UserType) => void;
};

export type GenreType = {
  id: number;
  name: string;
  title: string;
};
