import Link from "next/link";
import { fetchThumbnails } from "../api/fetchApi";

const CategoriesPage = async () => {
  const thumbnail = await fetchThumbnails();

  return (
    <div className="p-15">
      <div className="p-10">
        <h2 className="text-3xl text-center font-bold text-white">Category</h2>
      </div>
      <div className="grid grid-col-2 md:grid-cols-3 gap-4">
        {thumbnail.map((thumb) => (
          <Link
            key={thumb.genreId}
            href={`/category/${thumb.genreName.replace(" ", "-")}`}
            className="group"
          >
            {thumb.posterPath && (
              <div className="relative w-full h-40 rounded-md overflow-hidden">
                <div
                  className="bg-no-repeat bg-cover bg-center brightness-40 group-hover:brightness-60 w-full h-40 rounded-md"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${thumb.posterPath})`,
                  }}
                  role="img"
                  aria-label={thumb.genreName}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white text-center font-semibold">
                    {thumb.genreName}
                  </p>
                </div>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
