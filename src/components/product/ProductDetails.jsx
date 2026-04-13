"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
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
  const inquiryHref = `/contact/${slug}`;

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
    <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:items-start">
      <div className="space-y-5">
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
                sizes="(min-width: 1280px) 42vw, (min-width: 768px) 50vw, 100vw"
                priority
                loading="eager"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-500">
                No image available
              </div>
            )}

            <div className="pointer-events-none absolute left-4 top-4">
              {statusBadge}
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
                  <div className="relative h-24 w-24 overflow-hidden rounded-[14px] sm:h-24 sm:w-24">
                    <Image
                      src={img}
                      alt={`${title} thumbnail ${index + 1}`}
                      fill
                      className={`object-cover transition duration-300 ${
                        isActive ? "scale-[1.02]" : "group-hover:scale-105"
                      }`}
                      sizes="96px"
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

      <div className="space-y-8 lg:sticky lg:top-28">
        <div className="space-y-4 border-b border-black/10 pb-6">
          <p className="text-sm uppercase tracking-[0.18em] text-gray-500">
            {collection} · {year}
          </p>

          <div className="space-y-3">
            <h1 className="text-4xl font-normal leading-[1.02] tracking-tight md:text-5xl">
              {title}
            </h1>

            <div className="flex items-center gap-3">
              <p className="text-2xl font-medium text-black">
                ${price.toFixed(2)}
              </p>
              <div className="hidden sm:block">{statusBadge}</div>
            </div>
          </div>
        </div>

        {description && (
          <div className="space-y-3">
            <h2 className="text-sm uppercase tracking-[0.16em] text-gray-500">
              About this work
            </h2>
            <p className="max-w-xl text-[15px] leading-8 text-gray-700">
              {description}
            </p>
          </div>
        )}

        <div className="grid gap-4 rounded-2xl border border-black/5 bg-white/80 p-5 sm:grid-cols-2">
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

        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
          <div className="space-y-3">
            {!sold && !reserved ? (
              <>
                <h2 className="text-sm uppercase tracking-[0.16em] text-gray-500">
                  Inquiry
                </h2>
                <p className="text-sm leading-6 text-gray-600">
                  Interested in this artwork? Contact the gallery for
                  availability, shipping details, or purchase inquiries.
                </p>
                <Button href={inquiryHref} variant="primary">
                  Inquire about this artwork
                </Button>
              </>
            ) : (
              <>
                <h2 className="text-sm uppercase tracking-[0.16em] text-gray-500">
                  Inquiry
                </h2>
                <p className="text-sm leading-6 text-gray-600">
                  This piece is no longer available, but the gallery can suggest
                  similar works or discuss a commission.
                </p>
                <Button href={inquiryHref} variant="primary">
                  Ask about a simillar artwork
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="space-y-5 border-t border-black/10 pt-6">
          <div className="space-y-2">
            <h2 className="text-sm uppercase tracking-[0.16em] text-gray-500">
              Details
            </h2>
            <p className="text-sm leading-7 text-gray-600">
              Includes vintage wooden frame. Signed, titled, and ready to hang.
              Please note that colours may vary slightly across different
              screens, and hues or contrast may appear different depending on
              lighting conditions. Prices are listed in Canadian dollars.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm uppercase tracking-[0.16em] text-gray-500">
              Shipping & inquiries
            </h2>
            <p className="text-sm leading-7 text-gray-600">
              For availability, shipping, commissions, or purchase inquiries,
              please contact the gallery. Pick-up may be available in the
              Greater Montreal Area. International delivery timelines and quotes
              can be discussed directly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}