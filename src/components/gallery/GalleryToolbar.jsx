"use client";

import Button from "@/components/ui/Button";

export default function GalleryToolbar({
  collection,
  setCollection,
  availability,
  setAvailability,
  sortBy,
  setSortBy,
  collections,
  onReset,
}) {
  return (
    <div className="mb-8 rounded-2xl border border-black/5 bg-white/70 p-4">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="space-y-2">
          <label className="block text-xs uppercase tracking-[0.16em] text-gray-500">
            Collection
          </label>
          <select
            value={collection}
            onChange={(e) => setCollection(e.target.value)}
            className="w-full cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-black/20"
          >
            <option value="all">All collections</option>
            {collections.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-xs uppercase tracking-[0.16em] text-gray-500">
            Availability
          </label>
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="w-full cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-black/20"
          >
            <option value="all">All works</option>
            <option value="available">Available</option>
            <option value="sold">Sold</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-xs uppercase tracking-[0.16em] text-gray-500">
            Sort by
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-black/20"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        <div className="flex items-end">
          <Button
            type="button"
            variant="secondary"
            onClick={onReset}
            className="w-full"
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
}