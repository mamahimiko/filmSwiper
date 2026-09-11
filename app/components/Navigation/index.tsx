import Link from "next/link";
import Logout from "../Logout";

const Navigation = () => {
  return (
    <div className="flex justify-around p-4 text-lg text-white">
      <Link href="/" className=" hover:font-bold">
        Home
      </Link>
      <Link href="/category" className=" hover:font-bold">
        Discover
      </Link>
      <Link href="/watch-list" className=" hover:font-bold">
        Your Watch List
      </Link>
      <Logout />
    </div>
  );
};

export default Navigation;
