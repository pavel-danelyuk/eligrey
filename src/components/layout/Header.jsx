import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-4 flex justify-between">
        <Link href="/" className="font-bold">
          Eligrey Gallery
        </Link>

        <nav className="space-x-4">
          <Link href="/gallery">Gallery</Link>
          <Link href="/about">About</Link>
          <Link href="/commissions">Commissions</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/cart">Cart</Link>
        </nav>
      </div>
    </header>
  );
}