// Next.js Core
import Link from "next/link";

// Local Components
import RocketIcon from "@/app/components/Rocket";

const Navbar: React.FC = () => {
  return (
    <Link href="/">
      <header className="min-h-48 bg-black flex justify-center gap-4 items-center">
        <RocketIcon />
        <p className="text-white font-black text-4xl">
          <span className="text-primaryBg">Todo</span>
          <span className="text-secondaryBg">App</span>
        </p>
      </header>
    </Link>
  );
};

export default Navbar;
