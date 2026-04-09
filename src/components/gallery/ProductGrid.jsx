import ProductCard from "./ProductCard";

export default function ProductGrid({ artworks }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {artworks.map((artwork) => (
        <ProductCard
          key={artwork._id}
          slug={artwork.slug}
          title={artwork.title}
          price={artwork.price}
          mainImage={artwork.mainImage}
          status={artwork.status}
          collection={artwork.collection}
        />
      ))}
    </div>
  );
}