import { UserType } from "@/app/types/types";

const ProfileCard = ({ userName, genre, profileImg }: UserType) => {
  return (
    <div className="flex text-gray-800 bg-white justify-center w-85 md:w-100 rounded-2xl shadow-2xl md:p-4">
      <img src={profileImg} className="w-35 md:w-50" />
      <div>
        <div className="flex flex-col items-center justify-center h-full">
          <h3 className="text-3xl font-bold">{userName}</h3>
          <p>My genre: {genre}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
