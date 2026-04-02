import ProductGrid from "@/components/gallery/ProductGrid";
import { artworks } from "@/data/artworks";
import Link from "next/link";

export default function FeaturedArtworks() {
  const featured = artworks.slice(0, 3);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Featured Artworks</h2>
        <Link href="/gallery" className="text-sm underline">
          View all
        </Link>
      </div>

      <ProductGrid artworks={featured} />
    </section>
  );
}