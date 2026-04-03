import ProductGrid from "@/components/gallery/ProductGrid";
import { artworks } from "@/data/artworks";
import Link from "next/link";

export default function FeaturedArtworks() {
  const featured = artworks.filter((artwork) => artwork.featured);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-gray-500">
            Featured Collection
          </p>
          <h2 className="text-2xl font-bold md:text-3xl">Featured Artworks</h2>
        </div>

        <Link
          href="/gallery"
          className="text-sm font-medium underline underline-offset-4"
        >
          View all
        </Link>
      </div>

      <ProductGrid artworks={featured} />
    </section>
  );
}