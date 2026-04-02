import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-3">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Eli Grey Gallery</h2>
          <p className="text-sm text-gray-600">
            Original paintings and custom commissions inspired by nature, place,
            and atmosphere.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
            Navigation
          </h3>
          <nav className="flex flex-col gap-2 text-sm text-gray-600">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/commissions">Commissions</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/cart">Cart</Link>
          </nav>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
            Contact
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>eligreygallery@gmail.com</p>
            <p>Montreal, Canada</p>
            <p>Instagram coming soon</p>
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-4 text-sm text-gray-500">
          © 2024-{new Date().getFullYear()} Eli Grey Gallery.
        </div>
      </div>
    </footer>
  );
}