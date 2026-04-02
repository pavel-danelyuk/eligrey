import ProductDetails from "@/components/product/ProductDetails";
import PageContainer from "@/components/layout/PageContainer";
import { artworks } from "@/data/artworks";

export default function ProductPage() {
  const artwork = artworks[0];

  return (
    <PageContainer>
      <ProductDetails
        title={artwork.title}
        price={artwork.price}
        image={artwork.image}
        status={artwork.status}
        description={artwork.description}
        size={artwork.size}
        medium={artwork.medium}
      />
    </PageContainer>
  );
}