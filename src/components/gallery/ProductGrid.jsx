import ProductCard from "./ProductCard";

export default function ProductGrid({ artworks }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {artworks.map((artwork) => (
        <ProductCard
          key={artwork.id}
          id={artwork.id}
          title={artwork.title}
          price={artwork.price}
          image={artwork.image}
          status={artwork.status}
          collection={artwork.collection}
        />
      ))}
    </div>
  );
}