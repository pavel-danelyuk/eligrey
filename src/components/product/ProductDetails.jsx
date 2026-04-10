"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { urlFor } from "@/lib/sanity/image";

export default function ProductDetails({
  id,
  slug,
  title,
  price,
  mainImage,
  galleryImages,
  status,
  description,
  size,
  medium,
  collection,
  year,
}) {
  const { addToCart, isInCart } = useCart();
  const router = useRouter();

  const imageList = useMemo(() => {
    const images = [];

    if (mainImage) {
      images.push(urlFor(mainImage).width(1400).height(1750).url());
    }

    if (Array.isArray(galleryImages) && galleryImages.length > 0) {
      galleryImages.forEach((img) => {
        if (!img) return;
        const url = urlFor(img).width(1400).height(1750).url();
        if (!images.includes(url)) {
          images.push(url);
        }
      });
    }

    return images;
  }, [mainImage, galleryImages]);

  const [selectedImage, setSelectedImage] = useState(imageList[0] || "");

  useEffect(() => {
    setSelectedImage(imageList[0] || "");
  }, [imageList]);

  const sold = status === "sold";
  const reserved = status === "reserved";
  const alreadyInCart = isInCart(id);
  const disableAddToCart = sold || reserved || alreadyInCart;
  const primaryImage = imageList[0] || "";

  let buttonText = "Add to Cart";

  if (sold) {
    buttonText = "Sold";
  } else if (reserved) {
    buttonText = "Reserved";
  } else if (alreadyInCart) {
    buttonText = "Already in Cart";
  }

  const cartItem = {
    id,
    slug,
    title,
    price,
    image: primaryImage,
    status,
  };

  const handleBuyNow = () => {
    if (sold || reserved) return;

    if (!alreadyInCart) {
      addToCart(cartItem);
    }

    router.push("/cart");
  };

  return (
    <section className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
      <div className="space-y-4">
        <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
            {selectedImage ? (
              <Image
                src={selectedImage}
                alt={title}
                fill
                className={`object-cover transition duration-700 ${
                  sold ? "opacity-85" : ""
                }`}
                sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
                priority
                loading="eager"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-500">
                No image available
              </div>
            )}

            <div className="pointer-events-none absolute left-4 top-4">
              {sold ? (
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
              )}
            </div>
          </div>
        </div>

        {imageList.length > 1 && (
          <div className="flex flex-wrap gap-3 pt-1">
            {imageList.map((img, index) => {
              const isActive = selectedImage === img;

              return (
                <button
                  key={`${img}-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`group relative overflow-hidden rounded-2xl bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black/30 ${
                    isActive
                      ? "border-2 border-black shadow-md -translate-y-0.5"
                      : "border border-black/10 hover:border-black/30 hover:shadow-sm"
                  }`}
                  aria-label={`View image ${index + 1} of ${title}`}
                  aria-pressed={isActive}
                >
                  <div className="relative h-20 w-20 overflow-hidden rounded-[14px]">
                    <Image
                      src={img}
                      alt={`${title} thumbnail ${index + 1}`}
                      fill
                      className={`object-cover transition duration-300 ${
                        isActive ? "scale-[1.02]" : "group-hover:scale-105"
                      }`}
                      sizes="80px"
                    />
                  </div>

                  {isActive && (
                    <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/10" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.18em] text-gray-500">
            {collection} · {year}
          </p>

          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-normal leading-[1.05] tracking-tight">
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
            onClick={() => addToCart(cartItem)}
            className={`rounded-md px-6 py-3 text-sm font-medium transition ${
              disableAddToCart
                ? "cursor-not-allowed bg-gray-300 text-gray-600"
                : "cursor-pointer bg-black text-white hover:opacity-90"
            }`}
          >
            {buttonText}
          </button>

          {!sold && !reserved && (
            <button
              type="button"
              onClick={handleBuyNow}
              className="cursor-pointer rounded-md border border-black px-6 py-3 text-sm font-medium transition hover:bg-black hover:text-white"
            >
              Buy Now
            </button>
          )}
        </div>

        <div className="space-y-3 border-t border-black/10 pt-6 text-sm text-gray-600">
          <p>
            Includes vintage wooden frame. Signed, titled and ready to hang.
            Please note colours may vary slightly on different screens. Due to
            the subtlety of the work, hues and contrast may appear different in
            various lighting. Commissions available. Priced in Canadian Dollar.
            Applicable taxes will be applied at checkout. All sales a final.
          </p>
          <p>
            Shipping: Please allow up to 10 days to ship the painting. Pick-up
            is available in Greater Montreal Area. Free shipping in Canada. For
            international shipping please contact me with your mailing address
            for a shipping quote. For international orders there may be
            additional import fees charged by your government. This depends upon
            your country's custom policies. Please review your local importing
            fees and taxes to avoid any undesired surprises. Buyer is
            responsible for all custom fees.
          </p>
        </div>
      </div>
    </section>
  );
}