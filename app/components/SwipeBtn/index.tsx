import { MovieType, SwipeAction } from "@/app/types/types";
import { Dispatch, SetStateAction } from "react";
import { FaHeart, FaX } from "react-icons/fa6";

type SwipeBtnProps = {
  setAction: Dispatch<SetStateAction<SwipeAction>>;
  cards: MovieType[];
};

const SwipeBtn = ({ setAction, cards }: SwipeBtnProps) => {
  const handleLike = () => {
    if (cards.length === 0) return;
    const movie = cards[cards.length - 1];
    setAction({ type: "like", movieId: movie.id });
  };

  const handleDisLike = () => {
    if (cards.length === 0) return;
    const movie = cards[cards.length - 1];
    setAction({ type: "disLike", movieId: movie.id });
  };

  return (
    <div className="m-20 p-2 rounded-full  bg-black/20">
      <div className="flex gap-20">
        <button
          onClick={handleDisLike}
          className="bg-gray-700 hover:bg-gray-800 rounded-full p-6 border-none text-2xl cursor-pointer"
        >
          <FaX />
        </button>
        <button
          onClick={handleLike}
          className="bg-teal-500 hover:bg-teal-600 rounded-full p-6 text-2xl cursor-pointer"
        >
          <FaHeart />
        </button>
      </div>
    </div>
  );
};
export default SwipeBtn;
