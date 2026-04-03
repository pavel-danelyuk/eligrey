import PageContainer from "@/components/layout/PageContainer";
import ProductDetails from "@/components/product/ProductDetails";
import { artworks } from "@/data/artworks";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return artworks.map((artwork) => ({
    id: artwork.id,
  }));
}

export default async function ProductPage({ params }) {
  const { id } = await params;

  const artwork = artworks.find((item) => item.id === id);

  if (!artwork) {
    notFound();
  }

  return (
    <PageContainer>
      <ProductDetails
        id={artwork.id}
        title={artwork.title}
        price={artwork.price}
        collection={artwork.collection}
        year={artwork.year}
        image={artwork.image}
        status={artwork.status}
        description={artwork.description}
        size={artwork.size}
        medium={artwork.medium}
      />
    </PageContainer>
  );
}