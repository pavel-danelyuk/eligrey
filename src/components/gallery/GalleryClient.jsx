"use client";

import { useMemo, useState } from "react";
import ProductGrid from "@/components/gallery/ProductGrid";
import GalleryToolbar from "@/components/gallery/GalleryToolbar";

export default function GalleryClient({ artworks }) {
  const [collection, setCollection] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const collections = useMemo(() => {
    return [...new Set(artworks.map((artwork) => artwork.collection))];
  }, [artworks]);

  const handleReset = () => {
    setCollection("all");
    setAvailability("all");
    setSortBy("newest");
  };

  const filteredArtworks = useMemo(() => {
    let result = [...artworks];

    if (collection !== "all") {
      result = result.filter((artwork) => artwork.collection === collection);
    }

    if (availability !== "all") {
      result = result.filter((artwork) => artwork.status === availability);
    }

    if (sortBy === "newest") {
      result.sort((a, b) => b.year - a.year);
    } else if (sortBy === "oldest") {
      result.sort((a, b) => a.year - b.year);
    } else if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [artworks, collection, availability, sortBy]);

  return (
    <>
      <GalleryToolbar
        collection={collection}
        setCollection={setCollection}
        availability={availability}
        setAvailability={setAvailability}
        sortBy={sortBy}
        setSortBy={setSortBy}
        collections={collections}
        onReset={handleReset}
      />

      <div className="mb-6 text-sm text-gray-600">
        {filteredArtworks.length} artwork
        {filteredArtworks.length !== 1 ? "s" : ""} found
      </div>

      {filteredArtworks.length > 0 ? (
        <ProductGrid artworks={filteredArtworks} />
      ) : (
        <div className="rounded-2xl border border-dashed border-black/10 bg-white/50 px-6 py-12 text-center text-gray-600">
          No artworks match the selected filters.
        </div>
      )}
    </>
  );
}