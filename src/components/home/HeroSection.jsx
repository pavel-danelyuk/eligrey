import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="border-b border-black/9 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:py-24">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
            Original Art Gallery
          </p>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-normal leading-[1.05] tracking-tight">
              Original paintings inspired by nature, place, and atmosphere
            </h1>

            <p className="max-w-lg text-base leading-7 text-gray-600 md:text-lg">
              Discover available artwork, explore featured pieces, and request
              custom commissions through a clean gallery experience.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/gallery"
              className="rounded-md bg-black px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              View Gallery
            </Link>

            <Link
              href="/commissions"
              className="rounded-md border px-6 py-3 text-sm font-medium transition hover:bg-gray-100"
            >
              Request a Commission
            </Link>
          </div>

          <div className="flex flex-wrap gap-6 pt-2 text-sm text-gray-600">
            <p>Original works</p>
            <p>Custom commissions</p>
            <p>Secure checkout</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border bg-gray-100 shadow-sm">
          <div className="aspect-[4/5] w-full">
            <img
              src="/images/hero-artwork.avif"
              alt="Featured artwork"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}