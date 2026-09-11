/* eslint-disable @next/next/no-img-element */
import { fetchCredits, fetchMovieDetails } from "@/app/api/fetchApi";
import AddButton from "@/app/components/AddBtn";
import { GenreType, MovieInfoType } from "@/app/types/types";

const MoviePage = async ({ params }: { params: { id: number } }) => {
  const { id } = await params;

  const movieDetail = await fetchMovieDetails(id);

  const movieInfo: MovieInfoType = {
    id: movieDetail.id,
    title: movieDetail.title,
    poster_path: movieDetail.poster_path,
  };

  const castDetail = await fetchCredits(id);
  const castList = [];
  for (let i = 0; i < 10; i++) {
    castList.push(castDetail.cast[i]);
  }
  const director = castDetail.crew.find(
    (d: { job: string }) => d.job === "Director",
  );

  return (
    <div className="flex justify-center py-10">
      <div className="flex flex-col items-center md:flex-row">
        <div className="md:w-[50%] flex flex-col items-center">
          <img
            src={`https://image.tmdb.org/t/p/original/${movieDetail.poster_path}`}
            alt={movieDetail.title}
            className="w-60 md:w-70 rounded-2xl "
          />
          <div className="pt-3 lg:p-6">
            <AddButton movieInfo={movieInfo} />
          </div>
        </div>
        <div className="flex flex-col gap-5 p-6 md:w-120 lg:w-150">
          <h2 className="text-4xl text-center font-bold">
            {movieDetail.title}
          </h2>
          <p className="text-center">Directed by {director.name}</p>
          <div className="flex gap-2 justify-center lg:justify-start">
            {movieDetail?.genres.map((genre: GenreType, index: number) => (
              <div key={index} className="bg-white rounded-2xl px-2 py-1.5 ">
                <p className="text-teal-500 font-bold">{genre.name}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center lg:justify-start py-4">
            <p>{movieDetail.overview}</p>
          </div>
          <div>
            <h3 className="font-bold">Cast</h3>
            <div className="pt-4">
              {castList?.map((cast) => (
                <div
                  key={cast.id}
                  className="grid grid-cols-[1fr_auto_1fr] items-center gap-4"
                >
                  <p>{cast.name}</p>
                  <div className="w-16 border-t border-dotted border-gray-100" />
                  <p>{cast.character}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
