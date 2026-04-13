import Image from "next/image";
import PageContainer from "@/components/layout/PageContainer";
import ContactForm from "@/components/forms/ContactForm";
import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { notFound } from "next/navigation";

const artworkBySlugQuery = `
  *[_type == "artwork" && slug.current == $slug][0]{
    title,
    slug,
    price,
    status,
    mainImage
  }
`;

export default async function ArtworkContactPage({ params }) {
  const { slug } = await params;

  const artwork = await client.fetch(artworkBySlugQuery, { slug });

  if (!artwork) {
    notFound();
  }

  const imageUrl = artwork.mainImage
    ? urlFor(artwork.mainImage).width(900).height(1100).url()
    : null;

  return (
    <PageContainer>
      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-5">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.18em] text-gray-500">
              Artwork Inquiry
            </p>

            <h1 className="text-4xl font-normal leading-[1.05] tracking-tight md:text-5xl">
              Contact the Gallery
            </h1>
          </div>

          <p className="text-gray-700">
            You are inquiring about{" "}
            <span className="font-medium text-black">{artwork.title}</span>.
          </p>

          <p className="text-gray-700">
            Use the form to ask about availability, pricing, shipping, or
            similar works. The gallery will reply by email as soon as possible.
          </p>

          {imageUrl && (
            <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
              <div className="relative aspect-[4/5] w-full bg-gray-100">
                <Image
                  src={imageUrl}
                  alt={artwork.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              </div>
            </div>
          )}

          <div className="grid gap-4 rounded-2xl border border-black/5 bg-white/70 p-5 sm:grid-cols-2">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.16em] text-gray-500">
                Artwork
              </p>
              <p className="text-sm font-medium text-black">{artwork.title}</p>
            </div>

            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.16em] text-gray-500">
                Status
              </p>
              <p className="text-sm font-medium capitalize text-black">
                {artwork.status || "Available"}
              </p>
            </div>

            {typeof artwork.price === "number" && (
              <div className="space-y-1 sm:col-span-2">
                <p className="text-xs uppercase tracking-[0.16em] text-gray-500">
                  Price
                </p>
                <p className="text-sm font-medium text-black">
                  ${artwork.price.toFixed(2)}
                </p>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-black/5 bg-white/70 p-5">
            <p className="text-sm text-gray-700">
              Email:{" "}
              <a
                href="mailto:eligreygallery@gmail.com"
                className="underline underline-offset-4"
              >
                eligreygallery@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <ContactForm
            artworkSlug={slug}
            artworkTitle={artwork.title}
          />
        </div>
      </div>
    </PageContainer>
  );
}