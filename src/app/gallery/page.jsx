import PageContainer from "@/components/layout/PageContainer";
import GalleryClient from "@/components/gallery/GalleryClient";
import { client } from "@/lib/sanity/client";
import { ALL_ARTWORKS_QUERY } from "@/lib/sanity/queries";

export default async function GalleryPage() {
  const artworks = await client.fetch(ALL_ARTWORKS_QUERY);
  return (
    <PageContainer>
      <section className="space-y-6">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm uppercase tracking-[0.18em] text-gray-500">
            Gallery
          </p>

          <h1 className="text-4xl md:text-5xl font-normal leading-[1.05] tracking-tight">
            Explore original works
          </h1>

          <p className="text-base leading-7 text-gray-600">
            Browse available and sold pieces by collection, year, and price.
          </p>
        </div>

        <GalleryClient artworks={artworks} />
      </section>
    </PageContainer>
  );
}