import Link from "next/link";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/9 bg-[#f8f6f6]/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="logo-text text-xl tracking-wide">
          Eli Grey Gallery
        </Link>

        <Navbar />
      </div>
    </header>
  );
}