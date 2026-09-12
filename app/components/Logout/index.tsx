import { useState } from "react";
import { TbLogout } from "react-icons/tb";
import Dialog from "./dialog";

const Logout = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  return (
    <>
      <button
        onClick={toggleDialog}
        className="rounded-full bg-linear-to-bl from-violet-700 to-purple-400 hover:bg-violet-900 p-4 cursor-pointer shadow-lg"
      >
        <div className="flex gap-2">
          <TbLogout />
        </div>
      </button>
      {isDialogOpen && <Dialog closeDialog={toggleDialog} />}
    </>
  );
};
export default Logout;
