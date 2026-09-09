import Link from "next/link";

const Navigation = () => {
  return (
    <div className="flex justify-around ">
      <Link href="">Home</Link>
      <Link href="">Discover</Link>
      <Link href="">Next watch</Link>
      <Link href="">Watched</Link>
    </div>
  );
};

export default Navigation;
