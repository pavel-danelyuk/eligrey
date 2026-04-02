import ProductCard from "@/components/gallery/ProductCard";
import { artworks } from "@/data/artworks";

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Gallery</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {artworks.map((artwork) => (
          <ProductCard
            key={artwork.id}
            id={artwork.id}
            title={artwork.title}
            price={artwork.price}
            image={artwork.image}
            status={artwork.status}
          />
        ))}
      </div>
    </div>
  );
}