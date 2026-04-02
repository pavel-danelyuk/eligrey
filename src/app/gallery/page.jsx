import PageContainer from "@/components/layout/PageContainer";
import ProductGrid from "@/components/gallery/ProductGrid";
import { artworks } from "@/data/artworks";

export default function GalleryPage() {
  return (
    <PageContainer>
      <h1 className="mb-8 text-3xl font-bold">Gallery</h1>
      <ProductGrid artworks={artworks} />
    </PageContainer>
  );
}