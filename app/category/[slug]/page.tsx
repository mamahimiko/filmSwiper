import { fetchGenreIdbyName, fetchMoviesByGenre } from "@/app/api/fetchApi";
import { useUserContext } from "@/app/Context/userContext";
import { MovieInfoType, UserContextType } from "@/app/types/types";
import Link from "next/link";

const CategoryPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const genreId = await fetchGenreIdbyName(slug.replace("-", " "));
  const movieList = await fetchMoviesByGenre(genreId);

  return (
    <div className="p-10">
      <div className="py-10">
        <h2 className="text-3xl font-bold">{slug}</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8">
        {movieList &&
          movieList.map((movie: MovieInfoType) => (
            <div key={movie.id}>
              <Link href={`/movies/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={movie.title}
                />
              </Link>
              <p className="text-center">{movie.title}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryPage;
