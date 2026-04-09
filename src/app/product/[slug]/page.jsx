import PageContainer from "@/components/layout/PageContainer";
import ProductDetails from "@/components/product/ProductDetails";
import { client } from "@/lib/sanity/client";
import {
  ALL_ARTWORK_SLUGS_QUERY,
  ARTWORK_BY_SLUG_QUERY,
} from "@/lib/sanity/queries";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = await client.fetch(ALL_ARTWORK_SLUGS_QUERY);

  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

export default async function ProductPage({ params }) {
  const { slug } = await params;

  const artwork = await client.fetch(ARTWORK_BY_SLUG_QUERY, { slug });

  if (!artwork) {
    notFound();
  }

  return (
    <PageContainer>
      <ProductDetails
        id={artwork._id}
        slug={artwork.slug}
        title={artwork.title}
        price={artwork.price}
        mainImage={artwork.mainImage}
        galleryImages={artwork.galleryImages}
        status={artwork.status}
        description={artwork.description}
        size={artwork.size}
        medium={artwork.medium}
        collection={artwork.collection}
        year={artwork.year}
      />
    </PageContainer>
  );
}