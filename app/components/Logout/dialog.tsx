import { useUserContext } from "@/app/Context/userContext";
import { UserContextType } from "@/app/types/types";
import { X } from "lucide-react";

type DialogProps = {
  closeDialog: () => void;
};

const Dialog = ({ closeDialog }: DialogProps) => {
  const { setUser } = useUserContext() as UserContextType;

  const handleLogout = () => {
    setUser(null);
    closeDialog();
  };

  return (
    <div className="fixed inset-0 z-9999 bg-black/50 flex items-center justify-center">
      <div className="m-auto w-90 h-80 bg-white p-4 shadow-lg rounded-lg">
        <div className="flex justify-end text-black">
          <X onClick={closeDialog} />
        </div>
        <div className="flex flex-col">
          <div className=" text-gray-800 p-10">
            <p className="text-center">Do you want to log out?</p>
          </div>
          <div className="flex justify-around text-gray-800 py-15">
            <button
              onClick={closeDialog}
              className="border border-gray-800 rounded-sm w-25 p-2 hover:bg-orange-100"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="border border-gray-800 w-25 rounded-sm p-2 hover:bg-gray-100"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
