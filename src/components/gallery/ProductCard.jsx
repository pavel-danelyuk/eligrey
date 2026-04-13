import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { urlFor } from "@/lib/sanity/image";

export default function ProductCard({
  slug,
  title,
  price,
  mainImage,
  status,
  collection,
}) {
  const sold = status === "sold";
  const reserved = status === "reserved";

  const imageUrl = mainImage
    ? urlFor(mainImage).width(800).height(800).url()
    : null;

  const statusBadge = sold ? (
    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-red-600 shadow-sm backdrop-blur">
      Sold
    </span>
  ) : reserved ? (
    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-amber-600 shadow-sm backdrop-blur">
      Reserved
    </span>
  ) : (
    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-green-700 shadow-sm backdrop-blur">
      Available
    </span>
  );

  return (
    <article className="group overflow-hidden rounded-2xl border border-black/5 bg-white/80 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
      <Link href={`/product/${slug}`} className="block">
        <div className="relative aspect-square w-full overflow-hidden bg-[#f3f3f3]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-500">
              No image available
            </div>
          )}

          <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-2">
            {collection && (
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-black shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur">
                {collection}
              </span>
            )}

            {statusBadge}
          </div>
        </div>
      </Link>

      <div className="space-y-4 p-5">
        <div className="min-h-[72px] space-y-1.5">
          <h3 className="text-lg font-semibold leading-snug">{title}</h3>

          <p className="text-sm font-medium text-gray-800">
            ${price.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.16em] text-gray-500">
            Original Artwork
          </p>

          <Button href={`/product/${slug}`} variant="secondary">
            View
          </Button>
        </div>
      </div>
    </article>
  );
}