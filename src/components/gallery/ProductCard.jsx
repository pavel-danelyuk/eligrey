import Link from "next/link";

export default function ProductCard({
  id,
  title,
  price,
  image,
  images,
  status,
  collection,
}) {
  const sold = status === "sold";
  const previewImage =
    Array.isArray(images) && images.length > 0 ? images[0] : image;

  return (
    <article className="group overflow-hidden rounded-2xl border border-black/5 bg-white/80 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/product/${id}`} className="block">
        <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
          {previewImage ? (
            <img
              src={previewImage}
              alt={title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-500">
              No image available
            </div>
          )}

          <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-2">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-black shadow-sm backdrop-blur">
              {collection}
            </span>

            {sold ? (
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-red-600 shadow-sm backdrop-blur">
                Sold
              </span>
            ) : (
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-green-700 shadow-sm backdrop-blur">
                Available
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="space-y-4 p-5">
        <div className="min-h-[72px] space-y-1">
          <h3 className="text-lg font-semibold leading-snug">{title}</h3>
          <p className="text-sm text-gray-600">${price}</p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.16em] text-gray-500">
            Original Artwork
          </p>

          <Link
            href={`/product/${id}`}
            className="cursor-pointer rounded-md border border-black px-4 py-2 text-sm font-medium transition hover:bg-black hover:text-white"
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}