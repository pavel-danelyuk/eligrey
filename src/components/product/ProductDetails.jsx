"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function ProductDetails({
  id,
  title,
  price,
  image,
  status,
  description,
  size,
  medium,
  collection,
  year,
}) {
  const { addToCart, isInCart } = useCart();
  const router = useRouter();

  const sold = status === "sold";
  const alreadyInCart = isInCart(id);
  const disableAddToCart = sold || alreadyInCart;

  let buttonText = "Add to Cart";

  if (sold) {
    buttonText = "Sold";
  } else if (alreadyInCart) {
    buttonText = "Already in Cart";
  }

  const handleBuyNow = () => {
    if (sold) return;

    if (!alreadyInCart) {
      addToCart({
        id,
        title,
        price,
        image,
        status,
      });
    }

    router.push("/cart");
  };

  return (
    <section className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
      <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={title}
            className={`h-full w-full object-cover transition duration-500 hover:scale-[1.02] ${
              sold ? "opacity-85" : ""
            }`}
          />

          <div className="pointer-events-none absolute left-4 top-4">
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
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.18em] text-gray-500">
            {collection} · {year}
          </p>

          <div className="space-y-3">
            <h1 className="text-4xl font-bold leading-[1.05] md:text-5xl">
              {title}
            </h1>

            <p className="text-2xl font-medium text-gray-800">
              ${price.toFixed(2)}
            </p>
          </div>

          <p className="max-w-xl text-base leading-7 text-gray-600">
            {description}
          </p>
        </div>

        <div className="grid gap-4 rounded-2xl border border-black/5 bg-white/70 p-5 sm:grid-cols-2">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.16em] text-gray-500">
              Collection
            </p>
            <p className="text-sm font-medium text-black">{collection}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.16em] text-gray-500">
              Year
            </p>
            <p className="text-sm font-medium text-black">{year}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.16em] text-gray-500">
              Size
            </p>
            <p className="text-sm font-medium text-black">{size}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.16em] text-gray-500">
              Medium
            </p>
            <p className="text-sm font-medium text-black">{medium}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            disabled={disableAddToCart}
            onClick={() =>
              addToCart({
                id,
                title,
                price,
                image,
                status,
              })
            }
            className={`rounded-md px-6 py-3 text-sm font-medium transition ${
              disableAddToCart
                ? "cursor-not-allowed bg-gray-300 text-gray-600"
                : "cursor-pointer bg-black text-white hover:opacity-90"
            }`}
          >
            {buttonText}
          </button>

          <button
            type="button"
            disabled={sold}
            onClick={handleBuyNow}
            className={`rounded-md border px-6 py-3 text-sm font-medium transition ${
              sold
                ? "cursor-not-allowed border-gray-300 text-gray-400"
                : "cursor-pointer border-black hover:bg-black hover:text-white"
            }`}
          >
            {sold ? "Unavailable" : "Buy Now"}
          </button>
        </div>

        <div className="space-y-3 border-t border-black/10 pt-6 text-sm text-gray-600">
          <p>
            Includes vintage wooden frame.

            Signed, titled and ready to hang.

            Please note colours may vary slightly on different screens. Due to the subtlety of the work, hues and contrast may appear different in various lighting.

            Commissions available.

            Priced in Canadian Dollar. Applicable taxes will be applied at checkout.

            All sales a final.
          </p>
          <p>
            Shipping:

            Please allow up to 10 days to ship the painting.

            Pick-up is available in Greater Montreal Area.

            Free shipping in Canada.

            For international shipping please contact me with your mailing address for a shipping quote. For international orders there may be additional import fees charged by your government. This depends upon your country's custom policies. Please review your local importing fees and taxes to avoid any undesired surprises. Buyer is responsible for all custom fees.
          </p>
        </div>
      </div>
    </section>
  );
}