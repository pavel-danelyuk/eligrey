import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/9 bg-white">
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
          </nav>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
            Contact
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
              <p>
                <a
                  href="mailto:eligreygallery@gmail.com"
                  className="underline"
                  >
                  eligreygallery@gmail.com
                </a>
              </p>
            <p>Montreal, Canada</p>
            <p>
              <a
                href="https://www.instagram.com/eligreygallery/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-sm text-gray-600 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 transition group-hover:scale-110 group-hover:text-black"
                >
                  <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3.5A5.5 5.5 0 006.5 13 5.5 5.5 0 0012 18.5 5.5 5.5 0 0017.5 13 5.5 5.5 0 0012 7.5zm0 2A3.5 3.5 0 0115.5 13 3.5 3.5 0 0112 16.5 3.5 3.5 0 018.5 13 3.5 3.5 0 0112 9.5zm4.75-3.25a1 1 0 100 2 1 1 0 000-2z" />
                </svg>

                <span className="transition group-hover:text-black">
                  @eligreygallery
                </span>
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-black/9 bg-[#f8f6f6]/60 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-4 text-sm text-gray-500">
          © 2024-{new Date().getFullYear()} Eli Grey Gallery.
        </div>
      </div>
    </footer>
  );
}