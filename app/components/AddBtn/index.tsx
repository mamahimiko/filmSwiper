"use client";
import { useUserContext } from "@/app/Context/userContext";
import { MovieInfoType, UserContextType } from "@/app/types/types";
import { StarCheck, StarOff } from "lucide-react";

type AddButtonProps = {
  movieInfo: MovieInfoType;
};

const AddButton = ({ movieInfo }: AddButtonProps) => {
  const { user, setUser } = useUserContext() as UserContextType;

  const alreadySaved = user!.watchList.find(
    (movie) => movie.id === movieInfo.id,
  )
    ? true
    : false;

  const handleClick = () => {
    if (alreadySaved) {
      setUser({
        ...user!,
        watchList: user!.watchList.filter(
          (savedMovie) => savedMovie.id !== movieInfo.id,
        ),
      });
    } else {
      setUser({ ...user!, watchList: [...user!.watchList, movieInfo] });
    }
  };

  console.log(user);

  return (
    <>
      <button
        onClick={handleClick}
        className={`${alreadySaved ? "bg-gray-500 hover:bg-gray-600" : "bg-violet-600 hover:bg-violet-700"} text-white p-4 rounded-2xl w-60 md:w-70 cursor-pointer font-bold shadow-md`}
      >
        <div className="flex justify-center gap-3">
          {alreadySaved ? (
            <>
              <StarOff />
              <p>Remove from Watch List</p>
            </>
          ) : (
            <>
              <StarCheck />
              <p>Add Watch List</p>
            </>
          )}
        </div>
      </button>
    </>
  );
};

export default AddButton;
