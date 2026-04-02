import Link from "next/link";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-semibold tracking-wide">
          Eli Grey Gallery
        </Link>

        <Navbar />
      </div>
    </header>
  );
}